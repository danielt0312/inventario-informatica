<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Barryvdh\DomPDF\Facade\Pdf as DomPdf;
use Spatie\QueryBuilder\{
    AllowedFilter,
    QueryBuilder
};

use App\Http\Requests\Dictamen\{
    StoreDictamenRequest,
    UpdateDictamenRequest,
    DictaminarDictamenRequest,
    EvidenciarAcuseDictamenRequest,
    SurtirDictamenRequest,
    InventariarDictamenRequest
};

use App\Models\{
    Dictamen,
    DictamenAdquisicion,
    Archivo,
    Oficio
};

use App\Enums\{
    DocumentoTipoEnum,
    DictamenEstadoEnum,
    ArticuloEstadoEnum
};

use App\Services\{
    ArchivoService,
    ArticuloService,
    PdfWatermarkService,
};

class DictamenController extends Controller
{
    public function __construct(
        protected ArchivoService $archivoService
    ) {}

    public function index(Request $request)
    {
        return QueryBuilder::for(Dictamen::class)
            ->with(['oficio', 'estado', 'versionActual.archivo'])
            ->allowedFilters(
                AllowedFilter::partial('folio', 'oficio.folio'),
                AllowedFilter::belongsTo('estado')
            )
            ->paginate($request->query('per_page', 10))
            ->toResourceCollection();
    }

    public function store(StoreDictamenRequest $request)
    {
        $dictamen = DB::transaction(function () use ($request): Dictamen {
            $validated = $request->validated();

            $adscripcionId = $validated['adscripcion_id'];
            $oficio = null;
            // todo identificar si el area de adscripcion es la interna
            if ($adscripcionId != 2) {
                $archivo = $request->getArchivo();

                $archivo->temporal?->delete();

                $oficio = Oficio::create([
                    'folio' => $validated['folio'],
                ]);

                $archivo->documento()
                    ->make([
                        'tipo_id' => DocumentoTipoEnum::OFICIO->value
                    ])
                    ->documentable()
                    ->associate($oficio)
                    ->save();
            }

            //todo obtener el jefe de departamento de DTI
            $empleadoId = 1;

            $dictamen = Dictamen::create([
                'empleado_id' => $empleadoId,
                'adscripcion_id' => $adscripcionId,
                'oficio_id' => $oficio?->id
            ]);

            $version = $dictamen->versiones()->create([
                'fecha_solicitud' => $validated['fecha_solicitud'],
            ]);

            $version->adquisiciones()->createMany($request->getAdquisicionesValidatedData());

            $dictamen->versionActual()->associate($version)->save();

            return $dictamen;
        });

        return $dictamen->toResourceResponse(201);
    }

    public function show(string $uuid)
    {
        return QueryBuilder::for(Dictamen::class)
            ->with([
                'oficio.archivo',
                'estado',
                'ordenCompra.archivo',
                'versionActual.archivo'
            ])
            ->allowedIncludes('versiones.adquisiciones.articulo', 'versionActual.adquisiciones.articulo')
            ->where('uuid', $uuid)
            ->firstOrFail()
            ->toResource();
    }

    public function update(UpdateDictamenRequest $request, Dictamen $dictamen, PdfWatermarkService $watermarkService)
    {
        $dictamen = DB::transaction(function () use ($request, $dictamen, $watermarkService): Dictamen {
            $validated = $request->validated();

            $versionCanceladaArchivoPath = $this->archivoService->getFullPath($dictamen->versionActual->archivo);
            $watermarkService->apply(
                $versionCanceladaArchivoPath,
                $versionCanceladaArchivoPath,
                'CANCELADO'
            );

            $dictamen->versionActual()->update(['motivo_cambio' => $validated['motivo_cambio']]);

            $version = $dictamen->versiones()->create([
                'numero_version' => $dictamen->versionActual->numero_version + 1,
                'fecha_solicitud' => now(),
            ]);

            $version->adquisiciones()->createMany($request->getAdquisicionesValidatedData());

            $dictamen->versionActual()->associate($version)->save();

            $dictamen->load('versionActual.adquisiciones');
            $pdf = DomPdf::loadView('pdf-view::dictamen', compact('dictamen'));
            $archivoNombre = DocumentoTipoEnum::DICTAMEN->getLabelValue();

            $archivo = $this->archivoService->createAndStoreFromRaw(
                "{$archivoNombre} - No. {$dictamen->id}/{$dictamen->versionActual->numero_version}",
                $pdf->output(),
                'pdf'
            );

            $archivo->documento()->make([
                    'tipo_id' => DocumentoTipoEnum::DICTAMEN->value
                ])
                ->documentable()
                ->associate($version)
                ->save();

            $dictamen->update([
                'estado_id' => DictamenEstadoEnum::PENDIENTE_ACUSE->value
            ]);

            return $dictamen;
        });

        return $dictamen->toResourceResponse(201);
    }

    public function dictaminar(DictaminarDictamenRequest $request, Dictamen $dictamen)
    {
        $dictamen = DB::transaction(function () use ($request, $dictamen): Dictamen {
            $validated = $request->validated();

            foreach ($validated['adquisiciones'] as $adquisicion) {
                $dictamen->versionActual->adquisiciones()
                    ->where('id', $adquisicion['id'])
                    ->update([
                        'producto_tipo_id' => null,
                        'producto_id' => $adquisicion['producto_id'],
                        'especificaciones_tecnicas' => $adquisicion['especificaciones_tecnicas']
                    ]);
            }

            $dictamen->load('versionActual.adquisiciones');
            $pdf = DomPdf::loadView('pdf-view::dictamen', compact('dictamen'));
            $archivoNombre = DocumentoTipoEnum::DICTAMEN->getLabelValue();

            $archivo = $this->archivoService->createAndStoreFromRaw(
                "{$archivoNombre} - No. {$dictamen->id}/{$dictamen->versionActual->numero_version}",
                $pdf->output(),
                'pdf'
            );

            $archivo->documento()
                ->make([
                    'tipo_id' => DocumentoTipoEnum::DICTAMEN->value
                ])
                ->documentable()
                ->associate($dictamen->versionActual)
                ->save();

            $dictamen->update([
                'estado_id' => DictamenEstadoEnum::PENDIENTE_ACUSE->value
            ]);

            return $dictamen;
        });

        return $dictamen->toResource();
    }

    public function evidenciarAcuse(EvidenciarAcuseDictamenRequest $request, Dictamen $dictamen)
    {
        $dictamen = DB::transaction(function () use ($request, $dictamen): Dictamen {
            if ($dictamen->oficio && $dictamen->oficio->verified_at === null) {
                $oficioArchivoRequest = $request->getOficioArchivo();
                $oficioArchivoOriginal = $dictamen->oficio->archivo;

                $dictamen->oficio->documento->archivo()
                    ->associate($oficioArchivoRequest)
                    ->save();

                $oficioArchivoOriginal->delete();
                $oficioArchivoRequest->temporal->delete();
                $dictamen->oficio->update([
                    'verified_at' => now()
                ]);
            }

            $dictamenArchivoRequest = $request->getDictamenArchivo();
            $dictamenArchivoOriginal = $dictamen->versionActual->archivo;

            $dictamen->versionActual->documento->archivo()
                ->associate($dictamenArchivoRequest)
                ->save();

            $dictamenArchivoOriginal->delete();
            $dictamenArchivoRequest->temporal->delete();
            $dictamen->update([
                'estado_id' => DictamenEstadoEnum::SURTIR->value
            ]);

            return $dictamen;
        });

        return $dictamen->toResourceResponse();
    }

    public function surtir(SurtirDictamenRequest $request, Dictamen $dictamen)
    {
        $dictamen->update([
            'estado_id' => DictamenEstadoEnum::INVENTARIAR->value
        ]);

        return $dictamen->toResourceResponse();
    }

    public function inventariar(InventariarDictamenRequest $request, Dictamen $dictamen)
    {
        $dictamen = DB::transaction(function () use ($request, $dictamen): Dictamen {
            $validated = $request->validated();

            foreach ($validated['adquisiciones'] as $payloadAdquisicion) {
                ['cuenta_contable' => $cuentaContable] = $payloadAdquisicion;
                $producto = $request->getProductos($cuentaContable);

                $articulo = $request->getFacturaAdquisiciones($cuentaContable)
                    ->articulos()
                    ->create([
                        ...$payloadAdquisicion,
                        'es_inventariable' => !ArticuloService::esCuentaContableNoInventariable($payloadAdquisicion['cuenta_contable']),
                        'estado_id' => ArticuloEstadoEnum::ACTIVO->value,
                        'dictamen_id' => $dictamen->id,
                        'producto_id' => $producto->id
                    ]);

                $articulo->cumplimientoAdquisicion()
                    ->create([
                        'dictamen_adquisicion_id' => $payloadAdquisicion['id']
                    ]);
            }

            $ordenCompra = $request->getOrdenCompra();

            if ($dictamen->orden_compra_id === null) {
                $dictamen->ordenCompra()->associate($ordenCompra)->save();
            }

            foreach ($request->getFacturas() as $factura) {
                $factura->ordenCompras()->syncWithoutDetaching($ordenCompra);
            }

            $adquisiciones = $dictamen->versionActual->adquisiciones()
                ->withCount('articulosSurtidos')
                ->get();

            $faltaPorSurtirAdquisiciones = $adquisiciones->contains(fn ($a) => $a->articulos_surtidos_count < $a->cantidad);
            $dictamenEstadoId = $faltaPorSurtirAdquisiciones
                ? DictamenEstadoEnum::SURTIDO_PARCIAL->value
                : DictamenEstadoEnum::SURTIDO->value;

            if ($dictamen->tiene_observaciones) {
                $dictamen->update(['estado_id' => $dictamenEstadoId]);
                return $dictamen;
            }

            $algunArticuloTieneObservaciones = $dictamen->whereHas('articulos', fn ($q) => $q->where('es_resultado_esperado', false))
                ->exists();

            if ($algunArticuloTieneObservaciones) {
                $dictamen->update([
                    'estado_id' => $dictamenEstadoId,
                    'tiene_observaciones' => true
                ]);
                return $dictamen;
            }

            $dictamen->update([
                'estado_id' => $dictamenEstadoId,
                'tiene_observaciones' => $faltaPorSurtirAdquisiciones
                    ? null
                    : false
            ]);

            return $dictamen;
        });

        return $dictamen->load([
                'estado',
                'oficio',
                'ordenCompra' => ['proveedor'],
                'versionActual' => ['adquisiciones']
            ])
            ->toResourceResponse();
    }
}
