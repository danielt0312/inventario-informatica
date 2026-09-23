<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Dictamen;
use App\Services\DictamenService;

use Spatie\QueryBuilder\{
    AllowedFilter,
    QueryBuilder
};

use App\Http\Requests\Dictamen\{
    StoreDictamenRequest,
    CorregirDictamenRequest,
    DictaminarDictamenRequest,
    EvidenciarAcuseDictamenRequest,
    SurtirDictamenRequest,
    InventariarDictamenRequest
};

use App\Enums\{
    DocumentoTipoEnum,
    DictamenEstadoEnum,
    ArticuloEstadoEnum
};

use App\Data\Dictamen\{
    StoreDictamenData,
    DictaminarDictamenData,
    CorregirDictamenData,
    InventariarDictamenData
};

class DictamenController extends Controller
{
    public function __construct(
        protected DictamenService $dictamenService
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

    public function corregir(CorregirDictamenRequest $request, Dictamen $dictamen)
    {
        $this->dictamenService->corregir($dictamen, CorregirDictamenData::fromRequest($request));

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

        return $dictamen->toResourceResponse(201);
    }

    public function surtir(SurtirDictamenRequest $request, Dictamen $dictamen)
    {
        $this->dictamenService->surtir($dictamen);

        return $dictamen->toResourceResponse(201);
    }

    public function inventariar(InventariarDictamenRequest $request, Dictamen $dictamen)
    {
        $this->dictamenService->inventariar($dictamen, InventariarDictamenData::from($request->validated()), $request->getOrdenCompra());

        return $dictamen->load([
                'estado',
                'oficio',
                'ordenCompra' => ['proveedor'],
                'versionActual' => ['adquisiciones']
            ])
            ->toResourceResponse(201);
    }
}
