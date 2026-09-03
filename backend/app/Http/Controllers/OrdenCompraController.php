<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\OrdenCompra;
use App\Services\ArchivoService;
use App\Enums\DocumentoTipoEnum;
use App\Http\Requests\OrdenCompra\StoreOrdenCompraRequest;

class OrdenCompraController extends Controller
{
    public function __construct(
        protected ArchivoService $archivoService
    ) {}

    public function index(Request $request)
    {
        return OrdenCompra::with(['archivo', 'proveedor'])
            ->paginate($request->query('per_page', 10))
            ->toResourceCollection();
    }

    public function store(StoreOrdenCompraRequest $request)
    {
        $ordenCompra = DB::transaction(function () use ($request): OrdenCompra {
            $archivo = $request->getArchivo();
            $archivo->temporal->delete();

            $ordenCompra = OrdenCompra::create($request->validated());

            $archivo->documento()
                ->make([
                    'tipo_id' => DocumentoTipoEnum::ORDEN_COMPRA->value
                ])
                ->documentable()
                ->associate($ordenCompra)
                ->save();

            return $ordenCompra;
        });

        return $ordenCompra->load(['archivo', 'proveedor'])
            ->toResourceResponse(201);
    }
}
