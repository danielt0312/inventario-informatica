<?php

namespace App\Http\Controllers;

use App\Models\Articulo;
use App\Http\Requests\Articulo\StoreArticuloRequest;
use Illuminate\Http\Request;

class ArticuloController extends Controller
{
    public function index()
    {
        //
    }

    public function store(StoreArticuloRequest $request)
    {
        Articulo::create($request->validated());

        return response(status: 201);
    }

    public function show(Articulo $articulo)
    {
        //
    }

    public function update(Request $request, Articulo $articulo)
    {
        //
    }

    public function destroy(Articulo $articulo)
    {
        //
    }
}
