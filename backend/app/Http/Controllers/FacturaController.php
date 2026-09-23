<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Spatie\QueryBuilder\{
    AllowedFilter,
    QueryBuilder
};
use App\Models\Factura;
use App\Services\FacturaService;
use App\Data\Factura\StoreFacturaData;
use App\Http\Requests\Factura\StoreFacturaRequest;

class FacturaController extends Controller
{
    public function __construct(
        protected FacturaService $facturaService
    ) {}

    public function index(Request $request)
    {
        return QueryBuilder::for(Factura::class)
            ->allowedFilters(
                AllowedFilter::belongsTo('proveedor'),
            )
            ->with('archivo')
            ->paginate($request->query('per_page', 10))
            ->toResourceCollection();
    }

    public function store(StoreFacturaRequest $request)
    {
        $factura = DB::transaction(function () use ($request) {
            $archivo = $request->getArchivo();

            $archivo->temporal->delete();

            return $this->facturaService->crear(StoreFacturaData::from($request->validated()), $archivo);
        });

        return $factura->load(['archivo', 'proveedor'])
            ->toResourceResponse(201);
    }
}
