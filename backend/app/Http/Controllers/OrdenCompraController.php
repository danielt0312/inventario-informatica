<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\OrdenCompra;
use App\Services\OrdenCompraService;
use App\Data\OrdenCompra\StoreOrdenCompraData;
use App\Http\Requests\OrdenCompra\StoreOrdenCompraRequest;

class OrdenCompraController extends Controller
{
    public function __construct(
        protected OrdenCompraService $ordenCompraService
    ) {}

    public function index(Request $request)
    {
        return OrdenCompra::with(['archivo', 'proveedor'])
            ->paginate($request->query('per_page', 10))
            ->toResourceCollection();
    }

    public function store(StoreOrdenCompraRequest $request)
    {
        $ordenCompra = DB::transaction(function () use ($request) {
            $archivo = $request->getArchivo();

            $archivo->temporal->delete();

            return $this->ordenCompraService->crear(StoreOrdenCompraData::from($request->validated()), $archivo);
        });

        return $ordenCompra->load(['archivo', 'proveedor'])
            ->toResourceResponse(201);
    }
}
