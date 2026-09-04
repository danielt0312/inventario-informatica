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
use App\Services\ArchivoService;
use App\Http\Requests\Resguardo\UpdateEmpleadoResguardoRequest;
use Barryvdh\DomPDF\Facade\Pdf as DomPdf;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Spatie\QueryBuilder\QueryBuilder;

// TODO devolver '404' en caso de que el empleado no exista
class EmpleadoResguardoController extends Controller
{
    public function __construct(
        protected ArchivoService $archivoService
    ) {}

    public function show(int $empleadoId)
    {
        $data = QueryBuilder::for(Resguardo::class)
            ->with('estado')
            ->allowedIncludes(
                'articulosResguardados.articulo.producto.marca',
                'articulosResguardados.articulo.producto.tipo.categoria'
            )
            ->firstWhere([
                ['empleado_id', $empleadoId],
                ['estado_id', '!=', ResguardoEstadoEnum::ACTIVO->value]
            ]);

        return $data === null
            ? response()->json(compact('data'))
            : $data->toResource();
    }

    public function update(int $empleadoId, UpdateEmpleadoResguardoRequest $request)
    {
        $resguardo = DB::transaction(function () use ($empleadoId, $request): Resguardo {
            $resguardoActual = Resguardo::firstWhere('empleado_id', $empleadoId);

            if ($resguardoActual === null) {
                $resguardo = Resguardo::create([
                    'empleado_id' => $empleadoId,
                    'estado_id' => ResguardoEstadoEnum::PENDIENTE_ACUSE->value,
                    'fecha_actualizacion' => now(),
                ]);

                $articulosUuids = $request->validated('articulos');
                $articulosPorResguardar = Articulo::whereIn('uuid', $articulosUuids)
                    ->get()
                    ->keyBy('uuid');

                $articulosResguardados = array_map(
                    fn ($uuid) => [
                        'articulo_id' => $articulosPorResguardar->get($uuid)->id,
                        'fecha_asignacion' => now(),
                    ],
                    $articulosUuids
                );

                $resguardo->articulosResguardados()->createMany($articulosResguardados);
                $resguardo->load([
                    'articulosResguardados.articulo.producto' => [
                        'marca', 'tipo.categoria'
                    ]
                ]);

                $pdfTitle = DocumentoTipoEnum::RESGUARDO->getLabelValue();
                $pdf = DomPdf::loadView('pdf-view::resguardo', ['resguardo' => $resguardo, 'title' => $pdfTitle, 'fileTitle' => $pdfTitle]);
                $archivo = $this->archivoService->createAndStoreFromRaw(
                    $pdfTitle,
                    $pdf->output(),
                    'pdf'
                );

                $archivo->documento()
                    ->make([
                        'tipo_id' => DocumentoTipoEnum::RESGUARDO->value,
                    ])
                    ->documentable()
                    ->associate($resguardo)
                    ->save();

                return $resguardo;
            }
        });

        return $resguardo->load([
                'estado',
                'archivo'
            ])
            ->toResource();
    }

    public function destroy(int $empleadoId)
    {
        //
    }
}
