<?php

namespace App\Http\Controllers;

use App\Models\Resguardo;
use App\Services\ResguardoService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

// TODO devolver '404' en caso de que el empleado no exista
class EmpleadoResguardoController extends Controller
{
    public function __construct(
        ResguardoService $service,
    ) {}

    public function index(int $empleadoId)
    {
        return QueryBuilder::for(Resguardo::class)
            ->with('estado')
            ->allowedIncludes([
                'articulosResguardados.articulo.producto' => [
                    'marca', 'tipo.categoria'
                ]
            ])
            ->where('empleado_id', $empleadoId)
            ->toResourceCollection();
    }

    public function update(int $empleadoId, UpdateResguardoRequest $request)
    {
        DB::transaction(function () use ($empleadoId, $request) {
            $articulosId = $request->validated('articulos');
            $resguardoActual = Resguardo::firstWhere('empleado_id', $empleadoId);

            if ($resguardoActual === null) {
                $resguardo = new Resguardo([
                    'empleado_id' => $empleadoId,
                    'fecha_actualizacion' => 
                ])
            }
        });
    }

    public function destroy(int $empleadoId)
    {
        //
    }
}
