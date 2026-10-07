<?php

namespace App\Http\Controllers;

use App\Models\Resguardo;
use Spatie\QueryBuilder\QueryBuilder;

// TODO devolver '404' en caso de que el empleado no exista
class EmpleadoResguardoController extends Controller
{
    public function index(int $empleadoId)
    {
        return QueryBuilder::for(Resguardo::class)
            ->with('estado', 'archivo')
            ->allowedIncludes([
                'articulosResguardados.articulo.productoVariante.producto.marca',
                'articulosResguardados.articulo.productoVariante.producto.tipo.categoria',
                'articulosResguardados.articulo.estado'
            ])
            ->where('empleado_id', $empleadoId)
            ->toResourceCollection();
    }
}
