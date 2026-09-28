<?php

namespace App\Http\Controllers;

use App\Models\ProductoMarca;
use App\Http\Requests\ProductoMarca\StoreProductoMarcaRequest;

class ProductoMarcaController extends Controller
{
    public function index()
    {
        return ProductoMarca::get()
            ->toResourceCollection();
    }

    public function store(StoreProductoMarcaRequest $request)
    {
        return (ProductoMarca::create($request->validated()))
            ->toResourceResponse(201);
    }
}
