<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Spatie\QueryBuilder\QueryBuilder;
use App\Models\ProductoCategoria;
use App\Http\Requests\ProductoCategoria\StoreProductoCategoriaRequest;

class ProductoCategoriaController extends Controller
{
    public function index()
    {
        return QueryBuilder::for(ProductoCategoria::class)
            ->allowedIncludes('tipos')
            ->get()
            ->toResourceCollection();
    }

    public function store(StoreProductoCategoriaRequest $request)
    {
        return (ProductoCategoria::create($request->validated()))
            ->toResource()
            ->response()
            ->setStatusCode(201);
    }
}
