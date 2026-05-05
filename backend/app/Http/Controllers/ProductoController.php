<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests\ProductoRequest\ProductoRequest;

use App\Models\Producto;

class ProductoController extends Controller
{
    public function index(ProductoRequest $request)
    {
        $query = Producto::where($request->validated());

        if ($request->filled('tipos')) {
            $query->whereHas('tipo', fn ($q)
                => $q->whereIn('id', $request->input('tipos')));
        }

        if ($request->filled('marcas')) {
            $query->whereHas('marca', fn ($q)
                => $q->whereIn('id', $request->input('marcas')));
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
