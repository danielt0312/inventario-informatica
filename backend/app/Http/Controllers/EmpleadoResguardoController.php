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
    PdfWatermarkService
};
use App\Http\Requests\Resguardo\UpdateEmpleadoResguardoRequest;
use Barryvdh\DomPDF\Facade\Pdf as DomPdf;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Spatie\QueryBuilder\QueryBuilder;

// TODO devolver '404' en caso de que el empleado no exista
class EmpleadoResguardoController extends Controller
{
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

    public function update(int $empleadoId, UpdateEmpleadoResguardoRequest $request, ArchivoService $archivoService, PdfWatermarkService $pdfWatermarkService)
    {
        $resguardo = DB::transaction(function () use ($empleadoId, $request, $archivoService, $pdfWatermarkService): Resguardo {
            $resguardoActual = Resguardo::firstWhere('empleado_id', 1);

            if ($resguardoActual !== null) {
                $archivoPath = $archivoService->getFullPath($resguardoActual->archivo);
                $pdfWatermarkService->apply(
                    $archivoPath,
                    $archivoPath,
                    'CANCELADO'
                );
                $fechaCancelacion = now();
                $resguardoActual->update([
                    'fecha_cancelacion' => $fechaCancelacion,
                    'estado_id' => ResguardoEstadoEnum::CANCELADO->value,
                ]);
                $resguardoActual->articulosResguardados()->update([
                    'fecha_cancelacion' => $fechaCancelacion
                ]);
            }

            $resguardo = Resguardo::create([
                'empleado_id' => 1,
                'estado_id' => ResguardoEstadoEnum::PENDIENTE_ACUSE->value,
                'fecha_actualizacion' => now()
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
            $archivo = $archivoService->createAndStoreFromRaw(
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
