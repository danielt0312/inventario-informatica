<?php

namespace App\Http\Controllers;

use Spatie\QueryBuilder\QueryBuilder;
use App\Enums\ResguardoEstadoEnum;
use App\Services\ResguardoService;
use App\Http\Requests\Resguardo\ActualizarResguardoRequest;

use App\Models\{
    Resguardo,
    Articulo
};

// TODO devolver '404' en caso de que el empleado no exista
class EmpleadoResguardoActualController extends Controller
{
    public function __construct(
        protected ResguardoService $resguardoService
    ) {}

    public function index(int $empleadoId)
    {
        $data = QueryBuilder::for(Resguardo::class)
            ->with('estado')
            ->allowedIncludes(
                'articulosResguardados.articulo.productoVariante.producto.marca',
                'articulosResguardados.articulo.productoVariante.producto.tipo.categoria',
                'articulosResguardados.articulo.estado'
            )
            ->firstWhere([
                ['empleado_id', $empleadoId],
                ['estado_id', '!=', ResguardoEstadoEnum::Cancelado->value]
            ]);

        return $data === null
            ? response()->json(compact('data'))
            : $data->toResource();
    }

    public function actualizar(int $empleadoId, ActualizarResguardoRequest $request)
    {
        $articulosPorResguardar = Articulo::whereIn('uuid', $request->validated('articulos'))
            ->select('id')
            ->get()
            ->pluck('id')
            ->toArray();

        $resguardo = $this->resguardoService->actualizar($empleadoId, $articulosPorResguardar);

        return $resguardo->load([
                'estado',
                'archivo'
            ])
            ->toResource();
    }
}
