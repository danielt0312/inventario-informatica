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
                AllowedFilter::belongsTo('categorias', 'producto.tipo.categoria.id'),
                AllowedFilter::belongsTo('tipos', 'producto.tipo.id'),
                AllowedFilter::belongsTo('marcas', 'producto.marca.id'),
                AllowedFilter::belongsTo('productos'),
                AllowedFilter::belongsTo('estados'),
            )
            ->paginate($request->query('per_page', 10))
            ->toResourceCollection();
    }
}
