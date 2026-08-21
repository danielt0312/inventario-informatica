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
                'estado',
                'producto' => [
                    'tipo.categoria',
                    'marca'
                ]
            ])
            ->allowedFilters(
                AllowedFilter::belongsTo('categoria', 'producto.tipo.categoria'),
                AllowedFilter::belongsTo('tipo', 'producto.tipo'),
                AllowedFilter::belongsTo('marca', 'producto.marca'),
                AllowedFilter::belongsTo('producto'),
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
                'producto' => [
                    'tipo.categoria',
                    'marca'
                ]
            ])
            ->where('uuid', $uuid)
            ->firstOrFail()
            ->toResource();
    }
}
