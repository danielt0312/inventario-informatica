<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\ProductoTipo;

use App\Http\Requests\ProductoTipo\ProductoTipoRequest;

class ProductoTipoController extends Controller
{
    public function index(ProductoTipoRequest $request)
    {
        if (!$request->filled('categorias')) {
            return response()->json(['data' => []]);
        }

        $data = ProductoTipo::whereIn('categoria_id', $request->input('categorias'))
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
