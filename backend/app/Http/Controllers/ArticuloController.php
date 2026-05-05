<?php

namespace App\Http\Controllers;

use App\Models\Articulo;
use App\Http\Requests\Articulo\{ArticuloRequest, StoreArticuloRequest};
use Illuminate\Http\Request;

class ArticuloController extends Controller
{
    public function index(ArticuloRequest $request)
    {
        $query = Articulo::with(['estado', 'producto.tipo.categoria', 'producto.marca']);

        if ($request->filled('categorias')) {
            $query->whereHas('producto.tipo.categoria', fn ($q)
                => $q->whereIn('id', $request->input('categorias')));
        }

        if ($request->filled('tipos')) {
            $query->whereHas('producto.tipo', fn ($q)
                => $q->whereIn('id', $request->input('tipos')));
        }

        if ($request->filled('marcas')) {
            $query->whereHas('producto.marca', fn ($q)
                => $q->whereIn('id', $request->input('marcas')));
        }

        if ($request->filled('modelos')) {
            $query->whereHas('producto', fn ($q)
                => $q->whereIn('id', $request->input('modelos')));
        }

        $data = $query->paginate($request->query('per_page', 10));

        return response()->json($data);
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
