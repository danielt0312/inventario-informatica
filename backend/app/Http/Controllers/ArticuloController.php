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
            ->with([
                'surtimiento',
                'estado',
                'productoVariante.producto' => [
                    'tipo.categoria',
                    'marca'
                ]
            ])
            ->allowedFilters(
                AllowedFilter::belongsTo('categoria', 'productoVariante.producto.tipo.categoria'),
                AllowedFilter::belongsTo('tipo', 'productoVariante.producto.tipo'),
                AllowedFilter::belongsTo('marca', 'productoVariante.producto.marca'),
                AllowedFilter::belongsTo('producto', 'productoVariante.producto'),
                AllowedFilter::belongsTo('estado'),
            )
            ->paginate($request->query('per_page', 10))
            ->toResourceCollection();
    }

    public function show(string $uuid)
    {
        return QueryBuilder::for(Articulo::class)
            ->with([
                'estado',
                'productoVariante.producto' => [
                    'tipo.categoria',
                    'marca'
                ]
            ])
            ->where('uuid', $uuid)
            ->firstOrFail()
            ->toResource();
    }
}
