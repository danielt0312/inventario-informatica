<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Spatie\QueryBuilder\{AllowedFilter, QueryBuilder};

use App\Models\Factura;
use App\Enums\DocumentoTipoEnum;
use App\Http\Requests\Factura\StoreFacturaRequest;

class FacturaController extends ArchivableController
{
    public function index(Request $request)
    {
        return QueryBuilder::for(Factura::class)
            ->allowedFilters(
                AllowedFilter::exact('proveedor', 'ordenCompras.proveedor.id'),
            )
            ->with('archivo')
            ->paginate($request->query('per_page', 10))
            ->toResourceCollection();
    }

    public function store(StoreFacturaRequest $request)
    {
        $factura = DB::transaction(function () use ($request): Factura {
            $ordenCompra = $request->getOrdenCompra();
            $archivoPayload = $request->getArchivo();

            $archivoPayload->temporal?->delete();

            $documento = $archivoPayload->documento()->create([
                'tipo_id' => DocumentoTipoEnum::FACTURA->value
            ]);

            $factura = $documento->factura()->create([
                ...$request->validated(),
                'proveedor_id' => $ordenCompra->proveedor_id,
                'documento_id' => $documento->id
            ]);

            $factura->ordenCompras()->attach($ordenCompra);

            return $factura;
        });

        return $factura->load('archivo')
            ->toResourceResponse(201);
    }
}
