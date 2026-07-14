<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Spatie\QueryBuilder\{AllowedFilter, QueryBuilder};

use App\Models\Articulo;
use App\Http\Requests\Articulo\StoreArticuloRequest;

class ArticuloController extends Controller
{
    public function index(Request $request)
    {
        return QueryBuilder::for(Articulo::class)
            ->with(['estado', 'producto.tipo.categoria', 'producto.marca'])
            ->allowedFilters(
                AllowedFilter::exact('categorias', 'producto.tipo.categoria.id'),
                AllowedFilter::exact('tipos', 'producto.tipo.id'),
                AllowedFilter::exact('marcas', 'producto.marca.id'),
                AllowedFilter::exact('productos', 'producto_id'),
                AllowedFilter::exact('estados', 'estado_id'),
            )
            ->paginate($request->query('per_page', 10))
            ->toResourceCollection();
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
