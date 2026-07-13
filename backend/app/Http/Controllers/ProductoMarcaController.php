<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests\ProductoMarca\StoreProductoMarcaRequest;
use App\Models\ProductoMarca;
use Spatie\QueryBuilder\{AllowedInclude, QueryBuilder};

class ProductoMarcaController extends Controller
{
    public function index()
    {
        return QueryBuilder::for(ProductoMarca::class)
            ->allowedIncludes(
                AllowedInclude::relationship('productos', 'tipos'),
            )
            ->get()
            ->toResourceCollection();
    }

    public function store(StoreProductoMarcaRequest $request)
    {
        return (ProductoMarca::create($request->validated()))
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
