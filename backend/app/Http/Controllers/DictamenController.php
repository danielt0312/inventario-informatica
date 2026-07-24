<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Barryvdh\DomPDF\Facade\Pdf;
use Spatie\QueryBuilder\{AllowedFilter, QueryBuilder};

use App\Http\Requests\Dictamen\{
    StoreDictamenRequest,
    DictaminarDictamenRequest,
    EvidenciarDictamenRequest,
    SurtirDictamenRequest,
    InventariarDictamenRequest
};

use App\Models\{
    Articulo,
    Dictamen
};

use App\Enums\{
    ArticuloEstadoEnum,
    DocumentoTipoEnum,
    DictamenEstadoEnum
};

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
        $dictamen = DB::transaction(function () use ($request) {
            $validated = $request->validated();

            $adscripcionId = $validated['adscripcion_id'];
            $oficio = null;
            // todo identificar si el area de adscripcion es la interna
            if ($adscripcionId != 2) {
                $archivo = $this->archivoService->createAndStore($request->file('archivo'));

                $documento = $archivo->documento()->create([
                    'tipo_id' => DocumentoTipoEnum::OFICIO->value
                ]);

                $oficio = $documento->oficio()->create([
                    'folio' => $validated['folio']
                ]);
            }

            //todo obtener el jefe de departamento de DTI
            $user_id = 1;

            $dictamen = Dictamen::create([
                'user_id' => $user_id
            ]);

            $version = $dictamen->versiones()->create([
                'fecha_solicitud' => $validated['fecha_solicitud'],
                'oficio_id' => $oficio?->id,
                'adscripcion_id' => $adscripcionId
            ]);

            $version->adquisiciones()->createMany($validated['adquisiciones']);

            $dictamen->versionActual()->associate($version)->save();

            return $dictamen;
        });

        return $dictamen->toResource()
            ->response()
            ->setStatusCode(201);
    }

    public function show(string $uuid)
    {
        return QueryBuilder::for(Dictamen::class)
            ->with([
                'estado',
                'versionActual' => ['oficio.archivo', 'archivo']
            ])
            ->allowedIncludes('versiones.adquisiciones', 'versionActual.adquisiciones')
            ->where('uuid', $uuid)
            ->firstOrFail()
            ->toResource();
    }

    public function dictaminar(DictaminarDictamenRequest $request, Dictamen $dictamen)
    {
        $dictamen = DB::transaction(function () use ($request, $dictamen) {
            $validated = $request->validated();

            foreach ($validated['adquisiciones'] as $productoData) {
                $dictamen->versionActual->adquisiciones()
                    ->where('id', $productoData['id'])
                    ->update([
                        'producto_tipo_id' => null,
                        'producto_id' => $productoData['producto_id'],
                        'caracteristicas' => $productoData['caracteristicas']
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
            $dictamen->estado_id = DictamenEstadoEnum::EVIDENCIAR->value;
            $dictamen->save();

            return $dictamen;
        });

        return $dictamen->toResource()
            ->response()
            ->setStatusCode(200);
    }

    public function evidenciar(EvidenciarDictamenRequest $request, Dictamen $dictamen)
    {
        $this->archivoService->store(
            $dictamen->versionActual->documento->archivo,
            $request->file('archivo')
        );

        $dictamen->update([
            'estado_id' => DictamenEstadoEnum::SURTIR->value
        ]);

        return $dictamen->toResource()
            ->response()
            ->setStatusCode(200);
    }

    public function surtir(SurtirDictamenRequest $request, Dictamen $dictamen)
    {
        $dictamen->update([
            'estado_id' => DictamenEstadoEnum::INVENTARIAR->value
        ]);

        return $dictamen->toResource()
            ->response()
            ->setStatusCode(200);;
    }

    public function inventariar(InventariarDictamenRequest $request, Dictamen $dictamen)
    {
        DB::transaction(function () use ($request, $dictamen) {
            $validated = $request->validated();

            foreach ($validated['adquisiciones'] as $payload) {
                $factura = $request->getFactura($payload['factura_uuid']);

                $articulo = Articulo::create([
                    'producto_id' => $payload['producto_id'],
                    'factura_id' => $factura->id,
                ]);

                $articulo->recepcion()->create([
                    'resultado_esperado' => $payload['resultado_esperado'],
                    'observaciones' => $payload['observaciones'] ?? null
                ]);

                $articulo->dictamenArticulo()->create([
                    'dictamen_id' => $dictamen->id
                ]);
            }

            $dictamen->update([
                'estado_id' => DictamenEstadoEnum::RESGUARDAR->value
            ]);
        });

        return response(status: 200);
    }
}
