<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests\ProductoRequest\ProductoRequest;

use App\Models\Producto;

class ProductoController extends Controller
{
    public function index(ProductoRequest $request)
    {
        $data = Producto::where($request->validated())
            ->with(['tipo', 'marca'])
            ->get();

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
