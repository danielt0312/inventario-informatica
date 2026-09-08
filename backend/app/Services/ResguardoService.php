<?php

namespace App\Services;

use App\Exceptions\EntityNotEditableException;
use App\Support\FileNameGenerator;
use App\Actions\{
    CancelarArchivoAction,
    ReemplazarArchivoAction
};
use App\Models\Resguardo;
use App\Enums\{
    ResguardoEstadoEnum,
    DocumentoTipoEnum
};

class ResguardoService
{
    public function __construct(
        protected ArchivoService $archivoService,
        protected PdfViewService $pdfService
    ) {}

    protected function cancelacionFallida(): void
    {
        throw new EntityNotEditableException(
            reason: 'resguardo_ya_cancelado',
            message: 'El resguardo no puede ser cancelado debido a que ya se encuentra en este estado.'
        );
    }

    protected function esCancelable(Resguardo $resguardo): bool
    {
        return $resguardo->estado_id !== ResguardoEstadoEnum::CANCELADO->value;
    }

    public function cancelar(Resguardo $resguardo): void
    {
        if (! $this->esCancelable($resguardo)) {
            $this->cancelacionFallida();
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

    protected function cancelarPorEmpleado(int $empleadoId): void
    {
        $resguardo = Resguardo::firstWhere([
            ['empleado_id', $empleadoId],
            ['estado_id', '!=', ResguardoEstadoEnum::CANCELADO->value]
        ]);

        if ($resguardo !== null) {
            $this->cancelar($resguardo);
        }
    }

    protected function crear(int $empleadoId, array $articulosIds): Resguardo
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

        // todo validar que los articulos realmente no se encuentren bajo resguardo
        $resguardo->articulosResguardados()->createMany($articulosPorResguardar);

        $resguardo->load([
            'articulosResguardados.articulo.producto' => [
                'marca', 'tipo.categoria'
            ]
        ]);

        $title = FileNameGenerator::forUuid(DocumentoTipoEnum::RESGUARDO->getLabelValue(), $resguardo->uuid);
        $pdf = $this->pdfService->loadView('resguardo', compact('resguardo', 'title'));

        $archivo = $this->archivoService->createAndStoreFileFromRaw($pdf->output(), $title, 'pdf');

        $archivo->documento()
            ->make([
                'tipo_id' => DocumentoTipoEnum::RESGUARDO->value,
            ])
            ->documentable()
            ->associate($resguardo)
            ->save();

        return $resguardo;
    }

    public function actualizar(int $empleadoId, array $articulosIds): Resguardo
    {
        $this->cancelarPorEmpleado($empleadoId);

        return $this->crear($empleadoId, $articulosIds);
    }

    protected function evidenciaFallida(): void
    {
        throw new EntityNotEditableException(
            reason: 'resguardo_ya_evidenciado',
            message: 'El resguardo ya se encuentra con una evidencia de acuse de recibido.'
        );
    }

    protected function esEvidenciable(Resguardo $resguardo): bool
    {
        return $resguardo->estado_id === ResguardoEstadoEnum::PENDIENTE_ACUSE->value;
    }

    public function evidenciar(Resguardo $resguardo, Archivo $acuseArchivo): void
    {
        if (! $this->esEvidenciable($resguardo)) {
            $this->evidenciaFallida();
        }

        app()->call(ReemplazarArchivoAction::class, ['target' => $resguardo->archivo, 'replacer' => $acuseArchivo]);
    }
}
