<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Spatie\QueryBuilder\QueryBuilder;

use App\Models\ProductoTipo;
use App\Http\Requests\ProductoTipo\StoreProductoTipoRequest;

class ProductoTipoController extends Controller
{
    public function index()
    {
        return QueryBuilder::for(ProductoTipo::class)
            ->allowedIncludes('categoria')
            ->get()
            ->toResourceCollection();
    }

    public function store(StoreProductoTipoRequest $request)
    {
        return (ProductoTipo::create($request->validated()))
            ->toResource()
            ->response()
            ->setStatusCode(201);
    }
}
