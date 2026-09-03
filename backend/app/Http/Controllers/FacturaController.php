<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Spatie\QueryBuilder\{
    AllowedFilter,
    QueryBuilder
};
use App\Models\Factura;
use App\Services\ArchivoService;
use App\Enums\DocumentoTipoEnum;
use App\Http\Requests\Factura\StoreFacturaRequest;

class FacturaController extends Controller
{
    public function __construct(
        protected ArchivoService $archivoService
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
        $factura = DB::transaction(function () use ($request): Factura {
            $archivo = $request->getArchivo();
            $archivo->temporal->delete();

            $factura = Factura::create($request->validated());

            $archivo->documento()
                ->make([
                    'tipo_id' => DocumentoTipoEnum::FACTURA->value
                ])
                ->documentable()
                ->associate($factura)
                ->save();

            return $factura;
        });

        return $factura->load(['archivo', 'proveedor'])
            ->toResourceResponse(201);
    }
}
