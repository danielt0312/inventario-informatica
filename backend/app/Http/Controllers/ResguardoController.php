<?php

namespace App\Http\Controllers;

use App\Models\Resguardo;
use App\Services\ResguardoService;
use Illuminate\Http\Request;

use Spatie\QueryBuilder\{
    QueryBuilder,
    AllowedFilter
};

class ResguardoController extends Controller
{
    public function index(Request $request)
    {
        return QueryBuilder::for(Resguardo::class)
            ->with('estado', 'archivo')
            ->defaultSort('-fecha_actualizacion')
            ->allowedSorts('fecha_actualizacion')
            ->allowedFilters(
                AllowedFilter::belongsTo('estado'),
                // TODO realizar filtrados por empleado y adscripción (de empleado)
                // AllowedFilter::exact('empleado', 'empleado_id'),
                // AllowedFilter::exact('adscripcion', 'empleado.adscripcion_id'),
            )
            ->paginate($request->query('per_page', 10))
            ->toResourceCollection();
    }
}
