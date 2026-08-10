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
                AllowedFilter::callback('ordenCompra', fn ($q, $value) =>
                    $q->join('orden_compras', 'orden_compras.id', '=', 'facturas.orden_compra_id')
                        ->findByArchivoUuid($value, 'orden_compras')
                )
            )
            ->with('archivo')
            ->paginate($request->query('per_page', 10))
            ->toResourceCollection();
    }

    public function store(StoreFacturaRequest $request)
    {
        $factura = DB::transaction(function () use ($request): Factura {
            ['fecha_emision' => $fechaEmision] = $request->validated();
            $ordenCompra = $request->getOrdenCompra();
            $archivoPayload = $request->getArchivo();

            $archivoPayload->temporal?->delete();

            $documento = $archivoPayload->documento()->create([
                'tipo_id' => DocumentoTipoEnum::FACTURA->value
            ]);

            return $ordenCompra->facturas()->create([
                'fecha_emision' => $fechaEmision,
                'documento_id' => $documento->id
            ]);
        });

        return $factura->toResource()
            ->response()
            ->setStatusCode(201);
    }
}
