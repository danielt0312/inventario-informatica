<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Barryvdh\DomPDF\Facade\Pdf;
use Spatie\QueryBuilder\{AllowedFilter, QueryBuilder};

use App\Http\Requests\Dictamen\{
    StoreDictamenRequest,
    UpdateDictamenRequest,
    DictaminarDictamenRequest,
    EvidenciarDictamenRequest,
    SurtirDictamenRequest,
    InventariarDictamenRequest
};

use App\Models\{
    Dictamen,
    DictamenAdquisicion
};

use App\Enums\{
    DocumentoTipoEnum,
    DictamenEstadoEnum
};

use App\Services\ArticuloService;

class DictamenController extends ArchivableController
{
    public function index(Request $request)
    {
        return QueryBuilder::for(Dictamen::class)
            ->with([
                'estado',
                'versionActual' => ['oficio', 'archivo']
            ])
            ->allowedFilters(
                AllowedFilter::partial('folio', 'versionActual.oficio.folio'),
                AllowedFilter::exact('estados', 'estado.id')
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

                $documento = $archivo->documento()->create([
                    'tipo_id' => DocumentoTipoEnum::OFICIO->value
                ]);

                $oficio = $documento->oficio()->create([
                    'folio' => $validated['folio']
                ]);
            }

            //todo obtener el jefe de departamento de DTI
            $empleadoId = 1;

            $dictamen = Dictamen::create([
                'empleado_id' => $empleadoId,
                'adscripcion_id' => $adscripcionId,
            ]);

            $version = $dictamen->versiones()->create([
                'fecha_solicitud' => $validated['fecha_solicitud'],
                'oficio_id' => $oficio?->id,
            ]);

            $version->adquisiciones()->createMany($validated['adquisiciones']);

            $dictamen->versionActual()->associate($version)->save();

            return $dictamen;
        });

        return $dictamen->toResourceResponse(201);
    }

    public function show(string $uuid)
    {
        return QueryBuilder::for(Dictamen::class)
            ->with([
                'ordenCompra.archivo',
                'estado',
                'versionActual' => ['oficio.archivo', 'archivo']
            ])
            ->allowedIncludes('versiones.adquisiciones.articulo', 'versionActual.adquisiciones.articulo')
            ->where('uuid', $uuid)
            ->firstOrFail()
            ->toResource();
    }

    public function update(UpdateDictamenRequest $request, Dictamen $dictamen)
    {
        $dictamen = DB::transaction(function () use ($request, $dictamen): Dictamen {
            $validated = $request->validated();

            $adscripcionId = $dictamen->adscripcion_id;
            $oficio = $dictamen->versionActual->oficio;
            $archivoPayload = $request->getArchivo();

            // todo identificar si el area de adscripcion es la interna
            if ($adscripcionId != 2 && $oficio->archivo->isNot($archivoPayload)) {
                $archivoPayload->temporal?->delete();
                $oficio->documento->archivo()->associate($archivoPayload);
            }

            if ($oficio->folio !== $validated['folio']) {
                $oficio->update([
                    'folio' => $validated['folio']
                ]);
            }

            $version = $dictamen->versiones()->create([
                'numero_version' => $dictamen->versionActual->numero_version + 1,
                'fecha_solicitud' => now(),
                'oficio_id' => $oficio?->id,
            ]);

            $version->adquisiciones()->createMany($validated['adquisiciones']);

            $dictamen->versionActual()->associate($version)->save();

            $dictamen->load('versionActual.adquisiciones');

            $pdf = Pdf::loadView('pdf-view::dictamen', compact('dictamen'));

            $archivo = $this->archivoService->createAndStoreFromRaw(
                DocumentoTipoEnum::DICTAMEN->label(),
                $pdf->output()
            );

            $documento = $archivo->documento()->create([
                'tipo_id' => DocumentoTipoEnum::DICTAMEN->value
            ]);

            $dictamen->versionActual->documento()->associate($documento)->save();

            $dictamen->update([
                'estado_id' => DictamenEstadoEnum::EVIDENCIAR->value
            ]);

            return $dictamen;
        });

        return $dictamen->toResourceResponse();
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
                        'caracteristicas' => $adquisicion['caracteristicas']
                    ]);
            }

            $dictamen->load('versionActual.adquisiciones');

            $pdf = Pdf::loadView('pdf-view::dictamen', compact('dictamen'));

            $archivo = $this->archivoService->createAndStoreFromRaw(
                DocumentoTipoEnum::DICTAMEN->label(),
                $pdf->output()
            );

            $documento = $archivo->documento()->create([
                'tipo_id' => DocumentoTipoEnum::DICTAMEN->value
            ]);

            $dictamen->versionActual->documento()->associate($documento)->save();
            $dictamen->update([
                'estado_id' => DictamenEstadoEnum::EVIDENCIAR->value
            ]);

            return $dictamen;
        });

        return $dictamen->toResourceResponse();
    }

    public function evidenciar(EvidenciarDictamenRequest $request, Dictamen $dictamen)
    {
        $dictamen = DB::transaction(function () use ($request, $dictamen): Dictamen {
            $documento = $dictamen->versionActual->documento;

            $archivoOriginal = $documento->archivo;

            $documento->archivo()
                ->associate($request->getArchivo())
                ->save();

            $archivoOriginal->delete();

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

    public function inventariar(InventariarDictamenRequest $request, Dictamen $dictamen, ArticuloService $articuloService)
    {
        $dictamen = DB::transaction(function () use ($request, $dictamen, $articuloService): Dictamen {
            $validated = $request->validated();

            foreach ($validated['adquisiciones'] as $payloadAdquisicion) {
                ['cuenta_contable' => $cuentaContable] = $payloadAdquisicion;
                $producto = $request->getProductos($cuentaContable);

                $request->getFacturaAdquisiciones($cuentaContable)
                    ->articulos()
                    ->create([
                        ...$payloadAdquisicion,
                        'estado_id' => $articuloService->getEstadoEnum($producto->tipo_id)->value,
                        'dictamen_adquisicion_id' => $payloadAdquisicion['id'],
                        'producto_id' => $producto->id
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
                ->withCount('articulos')
                ->get();

            if ($adquisiciones->contains(fn ($a) => $a->articulos_count < $a->cantidad)) {
                $dictamen->update(['estado_id' => DictamenEstadoEnum::SURTIDO_PARCIAL->value]);
                return $dictamen;
            }

            $conObservaciones = $dictamen->versionActual->adquisiciones()
                ->whereHas('articulos', fn ($q) => $q->where('es_resultado_esperado', false))
                ->exists();

            $dictamen->update([
                'estado_id' => DictamenEstadoEnum::SURTIDO->value,
                'tiene_observaciones' => $conObservaciones,
            ]);

            return $dictamen;
        });

        return $dictamen->load([
                'estado',
                'ordenCompra' => ['proveedor'],
                'versionActual' => ['adquisiciones', 'oficio']
            ])
            ->toResourceResponse();
    }
}
