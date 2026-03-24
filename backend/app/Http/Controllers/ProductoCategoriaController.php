<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\ProductoCategoria;

class ProductoCategoriaController extends Controller
{
    public function index(Request $request)
    {
        $data = ProductoCategoria::all();

        return response()->json(compact('data'));
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
