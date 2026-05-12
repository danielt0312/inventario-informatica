<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests\ProductoRequest\ProductoRequest;

use App\Models\Producto;

class ProductoController extends Controller
{
    public function index(ProductoRequest $request)
    {
        if (!$request->filled('tipos')) {
            return response()->json(['data' => []]);
        }

        $query = Producto::whereHas('tipo', fn ($q)
            => $q->whereIn('tipo_id', $request->input('tipos')));

        if ($request->filled('marcas')) {
            $query->whereHas('marca', fn ($q)
                => $q->whereIn('marca_id', $request->input('marcas')));
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
