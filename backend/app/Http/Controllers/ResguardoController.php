<?php

namespace App\Http\Controllers;

use App\Models\Resguardo;
use App\Services\ResguardoService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
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

    public function destroy(Resguardo $resguardo, ResguardoService $service)
    {
        DB::transaction(fn () => $service->cancelar($resguardo));

        return response(status: 204);
    }

    public function show(string $uuid)
    {
        return QueryBuilder::for(Resguardo::class)
            ->with('estado')
            ->allowedIncludes(
                'articulosResguardados.articulo.producto.marca',
                'articulosResguardados.articulo.producto.tipo.categoria',
                'articulosResguardados.articulo.estado'
            )
            ->where('uuid', $uuid)
            ->firstOrFail()
            ->toResource();
    }
}
