<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Spatie\QueryBuilder\QueryBuilder;
use App\Models\ProductoCategoria;
use App\Http\Resources\ProductoCategoriaResource;
use App\Http\Requests\ProductoCategoria\StoreProductoCategoriaRequest;

class ProductoCategoriaController extends Controller
{
    public function index()
    {
        $data = QueryBuilder::for(ProductoCategoria::class)
            ->allowedIncludes('tipos')
            ->get();

        return ProductoCategoriaResource::collection($data);
    }

    public function store(StoreProductoCategoriaRequest $request)
    {
        return (ProductoCategoria::create($request->validated()))
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
