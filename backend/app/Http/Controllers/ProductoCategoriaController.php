<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Spatie\QueryBuilder\QueryBuilder;
use App\Models\ProductoCategoria;

class ProductoCategoriaController extends Controller
{
    public function index()
    {
        return QueryBuilder::for(ProductoCategoria::class)
            ->allowedIncludes('tipos')
            ->toResourceCollection();
    }

    public function store(Request $request)
    {
        //
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
