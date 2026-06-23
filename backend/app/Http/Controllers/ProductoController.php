<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests\ProductoRequest\ProductoRequest;

use App\Models\Producto;
use Spatie\QueryBuilder\{AllowedFilter, QueryBuilder};

class ProductoController extends Controller
{
    public function index(Request $request)
    {
        $query = QueryBuilder::for(Producto::class)
            ->allowedIncludes('tipo.categoria', 'marca')
            ->allowedFilters(
                AllowedFilter::exact('tipos', 'tipo_id'),
                AllowedFilter::exact('marcas', 'marca_id')
            );

        if ($request->has('per_page')) {
            return $query
                ->paginate($request->query('per_page', 10))
                ->toResourceCollection();
        }

        return $query
            ->get()
            ->toResourceCollection();
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
