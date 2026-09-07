<?php

namespace App\Services;

use App\Actions\CancelarArchivoAction;
use App\Models\Resguardo;
use App\Enums\{
    ResguardoEstadoEnum,
    DocumentoTipoEnum
};
use App\Traits\Services\HasArchivoCancelable;

class ResguardoService
{
    use HasArchivoCancelable;

    public function __construct(
        protected ArchivoService $archivoService,
    ) {}

    public function cancelar(Resguardo $resguardo): void
    {
        if ($resguardo->estado_id === ResguardoEstadoEnum::CANCELADO->value) {
            return;
        }

        app()->call(CancelarArchivoAction::class, ['archivo' => $resguardo->archivo]);

        $fechaCancelacion = now();

        $resguardo->update([
            'estado_id' => ResguardoEstadoEnum::CANCELADO->value,
            'fecha_cancelacion' => $fechaCancelacion,
        ]);

        $resguardo->articulosResguardados()->update([
            'fecha_cancelacion' => $fechaCancelacion,
        ]);
    }

    public function crear(int $empleadoId, array $articulosIds): Resguardo
    {
        $fechaActual = now();

        $resguardo = Resguardo::create([
            'empleado_id' => $empleadoId,
            'estado_id' => ResguardoEstadoEnum::PENDIENTE_ACUSE->value,
            'fecha_actualizacion' => $fechaActual
        ]);

        $articulosPorResguardar = array_map(
            fn ($id) => [
                'articulo_id' => $id,
                'fecha_asignacion' => $fechaActual,
            ],
            $articulosIds
        );

        $resguardo->articulosResguardados()->createMany($articulosPorResguardar);
        $resguardo->load([
            'articulosResguardados.articulo.producto' => [
                'marca', 'tipo.categoria'
            ]
        ]);

        $filename = FileName
        $pdf = app()->call(PdfViewService::class, ['view' => 'resguardo', 'resguardo' => $resguardo, 'title' =>])

        $archivo = $this->archivoService->createAndStoreFileFromRaw($pdf, $filename, 'pdf');

        $archivo->documento()
            ->make([
                'tipo_id' => DocumentoTipoEnum::RESGUARDO->value,
            ])
            ->documentable()
            ->associate($resguardo)
            ->save();
    }
}
