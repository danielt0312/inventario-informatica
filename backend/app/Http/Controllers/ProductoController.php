<?php

namespace App\Http\Controllers;

use App\Models\ProductoVariante;
use App\Data\Producto\ProductoData;
use App\Http\Requests\Producto\StoreProductoRequest;
use App\Services\ProductoService;

use Spatie\QueryBuilder\{
    AllowedFilter,
    QueryBuilder
};

class ProductoController extends Controller
{
    public function __construct(
        protected ProductoService $productoService
    ) {}

    public function index()
    {
        return ProductoVariante::genericas()
            ->with([
                'producto' => [
                    'tipo.categoria',
                    'marca'
                ]
            ])
            ->get()
            ->toResourceCollection();
    }

    public function store(StoreProductoRequest $request)
    {
        return $this->productoService->crearGenerico(ProductoData::from($request->validated()))
            ->load('producto.marca')
            ->toResourceResponse(201);
    }
}
