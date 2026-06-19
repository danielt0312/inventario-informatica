<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Spatie\QueryBuilder\QueryBuilder;
use App\Models\ProductoTipo;
use App\Http\Resources\ProductoTipoResource;
use App\Http\Requests\ProductoTipo\StoreProductoTipoRequest;

class ProductoTipoController extends Controller
{
    public function index()
    {
        $data = QueryBuilder::for(ProductoTipo::class)
            ->allowedIncludes('categoria')
            ->get();

        return ProductoTipoResource::collection($data);
    }

    public function store(StoreProductoTipoRequest $request)
    {
        ProductoTipo::create($request->validated());

        return response(status: 201);
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
