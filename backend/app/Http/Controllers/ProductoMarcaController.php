<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests\ProductoMarca\ProductoMarcaRequest;

use App\Models\ProductoMarca;

class ProductoMarcaController extends Controller
{
    public function index(ProductoMarcaRequest $request)
    {
        $query = ProductoMarca::query();

        if ($request->filled('tipos')) {
            $query->join('productos', 'producto_marcas.id', '=', 'productos.marca_id')
                ->whereIn('producto_marcas.id', $request->input('tipos'))
                ->select('producto_marcas.*')
                ->distinct();
        }

        $data = $query->get();

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
