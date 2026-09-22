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
    DictamenSurtimiento,
    Archivo,
    Oficio,
};

use App\Enums\{
    DocumentoTipoEnum,
    DictamenEstadoEnum,
    ArticuloEstadoEnum,
};

use App\Services\{
    ArchivoService,
    CuentaContableService,
    PdfWatermarkService,
    DocumentoService,
    OficioService,
    DictamenService,
};

use App\Data\Dictamen\{
    StoreDictamenData,
    DictaminarDictamenData
};

class DictamenController extends Controller
{
    public function __construct(
        protected ArchivoService $archivoService,
        protected DocumentoService $documentoService,
        protected OficioService $oficioService,
        protected DictamenService $dictamenService,
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
        $dictamen = DB::transaction(function () use ($request) {
            $oficioArchivo = null;
            if (! $this->dictamenService->esAdscripcionInterna($request->validated('adscripcion_id'))) {
                $oficioArchivo = $request->getArchivo();
                $oficioArchivo->temporal?->delete();
            }

            return $this->dictamenService->crear(StoreDictamenData::fromRequest($request), $oficioArchivo);
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

            $nuevaVersion = $dictamen->versiones()->create([
                'numero_version' => $dictamen->versionActual->numero_version + 1,
                'fecha_solicitud' => now(),
            ]);

            $nuevaVersion->adquisiciones()->createMany($request->getAdquisicionesValidatedData());

            $dictamen->versionActual()->associate($nuevaVersion)->save();

            $dictamen->load('versionActual.adquisiciones');
            $pdf = DomPdf::loadView('pdf-view::dictamen', compact('dictamen'));
            $archivoNombre = DocumentoTipoEnum::DICTAMEN->getLabelValue();

            $archivo = $this->archivoService->createAndStoreFileFromRaw(
                $pdf->output(),
                "{$archivoNombre} - No. {$dictamen->id}/{$dictamen->versionActual->numero_version}",
                'pdf'
            );

            $this->documentoService->createForModel($nuevaVersion, $archivo);

            $dictamen->update([
                'estado_id' => DictamenEstadoEnum::PENDIENTE_ACUSE->value
            ]);

            return $dictamen;
        });

        return $dictamen->toResourceResponse(201);
    }

    public function dictaminar(DictaminarDictamenRequest $request, Dictamen $dictamen)
    {
        $this->dictamenService->dictaminar($dictamen, DictaminarDictamenData::from($request));

        return $dictamen->toResource();
    }

    public function evidenciarAcuse(EvidenciarAcuseDictamenRequest $request, Dictamen $dictamen)
    {
        DB::transaction(function () use ($request, $dictamen) {
            $dictamenArchivo = $request->getDictamenArchivo();
            $oficioArchivo = $request->getOficioArchivo();

            $dictamenArchivo->temporal?->delete();
            $oficioArchivo?->temporal?->delete();

            $this->dictamenService->evidenciarAcuse($dictamen, $dictamenArchivo, $oficioArchivo);
        });

        return $dictamen->toResourceResponse();
    }

    public function surtir(SurtirDictamenRequest $request, Dictamen $dictamen)
    {
        $this->dictamenService->surtir($dictamen);

        return $dictamen->toResourceResponse();
    }

    public function inventariar(InventariarDictamenRequest $request, Dictamen $dictamen)
    {
        $dictamen = DB::transaction(function () use ($request, $dictamen): Dictamen {
            $validated = $request->validated();

            foreach ($validated['adquisiciones'] as $payloadAdquisicion) {
                ['cuenta_contable' => $cuentaContable] = $payloadAdquisicion;
                $producto = $request->getProductos($cuentaContable);

                // todo corregir ingreso de articulos para las licencias
                $articulo = $request->getFacturaAdquisiciones($cuentaContable)
                    ->articulos()
                    ->create([
                        ...$payloadAdquisicion,
                        'es_inventariable' => !CuentaContableService::esNoInventariable($payloadAdquisicion['cuenta_contable']),
                        'estado_id' => ArticuloEstadoEnum::ACTIVO->value,
                        'dictamen_id' => $dictamen->id,
                        'producto_id' => $producto->id
                    ]);

                $surtimiento = $articulo->surtimiento()
                    ->create([
                        'dictamen_adquisicion_id' => $payloadAdquisicion['id'],
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
                ->withCount('surtimientos')
                ->get();

            $faltaPorSurtirAdquisiciones = $adquisiciones->contains(fn ($a) => $a->surtimientos_count < $a->cantidad);
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
