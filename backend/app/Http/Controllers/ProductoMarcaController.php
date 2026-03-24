<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests\ProductoMarca\ProductoMarcaRequest;

use App\Models\ProductoMarca;

class ProductoMarcaController extends Controller
{
    public function index(ProductoMarcaRequest $request)
    {
        $data = ProductoMarca::query()
            ->join('productos', 'producto_marcas.id', '=', 'productos.producto_marca_id')
            ->select('producto_marcas.*')
            ->distinct()
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
