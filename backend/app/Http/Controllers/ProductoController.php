<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Producto;
use App\Http\Requests\Producto\StoreProductoRequest;
use Spatie\QueryBuilder\{AllowedFilter, QueryBuilder};

class ProductoController extends Controller
{
    public function index()
    {
        return QueryBuilder::for(Producto::class)
            ->allowedIncludes('tipo.categoria', 'marca')
            ->allowedFilters(
                AllowedFilter::exact('tipos', 'tipo_id'),
                AllowedFilter::exact('marcas', 'marca_id')
            )
            ->get()
            ->toResourceCollection();
    }

    public function store(StoreProductoRequest $request)
    {
        return (Producto::create($request->validated()))
            ->toResource()
            ->response()
            ->setStatusCode(201);
    }

    public function show(string $id)
    {
        //
    }

    public function update(Request $request, string $id)
    {
        //
    }

    public function destroy(string $id)
    {
        //
    }
}
