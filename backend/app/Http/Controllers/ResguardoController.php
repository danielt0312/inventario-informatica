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
use App\Http\Requests\Resguardo\EvidenciarAcuseResguardoRequest;

class ResguardoController extends Controller
{
    public function __construct(
        protected ResguardoService $service
    ) {}

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

    public function show(string $uuid)
    {
        return QueryBuilder::for(Resguardo::class)
            ->with([
                'archivo',
                'estado',
                'articulosResguardados.articulo' => [
                    'producto' => ['marca', 'tipo.categoria'],
                    'estado'
                ]
            ])
            ->where('uuid', $uuid)
            ->firstOrFail()
            ->toResource();
    }

    public function cancelar(Resguardo $resguardo)
    {
        $this->service->cancelar($resguardo);

        return response(status: 204);
    }

    public function evidenciarAcuse(EvidenciarAcuseResguardoRequest $request, Resguardo $resguardo)
    {
        $this->service->evidenciarAcuse($resguardo, $request->getArchivo());

        return response(status: 204);
    }
}
