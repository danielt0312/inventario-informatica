<?php

namespace App\Http\Controllers;

use App\Models\{
    Resguardo,
    Articulo
};
use App\Enums\{
    ResguardoEstadoEnum,
    DocumentoTipoEnum
};
use App\Services\{
    ArchivoService,
    PdfWatermarkService,
    ResguardoService
};
use App\Http\Requests\Resguardo\UpdateEmpleadoResguardoRequest;
use Barryvdh\DomPDF\Facade\Pdf as DomPdf;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Spatie\QueryBuilder\QueryBuilder;

// TODO devolver '404' en caso de que el empleado no exista
class EmpleadoResguardoController extends Controller
{
    public function __construct(
        protected ResguardoService $service
    ) {}

    public function show(int $empleadoId)
    {
        $data = QueryBuilder::for(Resguardo::class)
            ->with('estado')
            ->allowedIncludes(
                'articulosResguardados.articulo.producto.marca',
                'articulosResguardados.articulo.producto.tipo.categoria',
                'articulosResguardados.articulo.estado'
            )
            ->firstWhere([
                // ['empleado_id', $empleadoId],
                ['empleado_id', 1],
                ['estado_id', '!=', ResguardoEstadoEnum::ACTIVO->value]
            ]);

        return $data === null
            ? response()->json(compact('data'))
            : $data->toResource();
    }

    public function update(int $empleadoId, UpdateEmpleadoResguardoRequest $request)
    {
        $articulosPorResguardar = Articulo::whereIn('uuid', $request->validated('articulos'))
            ->get()
            ->pluck('id');

        $resguardo = DB::transaction(fn () => $this->service->actualizar($empleadoId, $articulosPorResguardar->toArray()));

        return $resguardo->load([
                'estado',
                'archivo'
            ])
            ->toResource();
    }

    public function destroy(int $empleadoId)
    {
        DB::transaction(fn () => $this->service->cancelarSiExiste($empleadoId));

        return response(status: 204);
    }
}
