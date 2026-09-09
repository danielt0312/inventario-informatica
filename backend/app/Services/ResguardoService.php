<?php

namespace App\Services;

use App\Exceptions\EntityNotEditableException;
use App\Support\FileNameGenerator;
use App\Actions\{
    CancelarArchivoAction,
    ReemplazarArchivoAction
};
use App\Models\{
    Resguardo,
    Archivo
};
use App\Enums\{
    ResguardoEstadoEnum,
    DocumentoTipoEnum
};
use Illuminate\Support\Facades\DB;

class ResguardoService
{
    public function __construct(
        protected ArchivoService $archivoService,
        protected PdfViewService $pdfService,
        protected CancelarArchivoAction $cancelarArchivoAction,
        protected ReemplazarArchivoAction $reemplazarArchivoAction,
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

        $this->cancelarArchivoAction->handle($resguardo->archivo);

        $fechaCancelacion = now();

        DB::transaction(function () use ($resguardo, $fechaCancelacion) {
            $resguardo->update([
                'estado_id' => ResguardoEstadoEnum::CANCELADO->value,
                'fecha_cancelacion' => $fechaCancelacion,
            ]);

            $resguardo->articulosResguardados()->update([
                'fecha_cancelacion' => $fechaCancelacion,
            ]);
        });
    }

    protected function crear(int $empleadoId, array $articulosIds): Resguardo
    {
        $fechaActual = now();

        $articulosPorResguardar = array_map(
            fn ($id) => [
                'articulo_id' => $id,
                'fecha_asignacion' => $fechaActual,
            ],
            $articulosIds
        );

        $resguardo = DB::transaction(function () use ($empleadoId, $fechaActual, $articulosPorResguardar): Resguardo {
            $resguardo = Resguardo::create([
                'empleado_id' => $empleadoId,
                'estado_id' => ResguardoEstadoEnum::PENDIENTE_ACUSE->value,
                'fecha_actualizacion' => $fechaActual
            ]);

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
        });

        return $resguardo;
    }

    public function actualizar(int $empleadoId, array $articulosIds): Resguardo
    {
        $resguardo = DB::transaction(function () use ($empleadoId, $articulosIds): Resguardo {
            $resguardoActual = Resguardo::firstWhere([
                ['empleado_id', $empleadoId],
                ['estado_id', '!=', ResguardoEstadoEnum::CANCELADO->value]
            ]);

            if ($resguardoActual !== null) {
                $this->cancelar($resguardoActual);
            }

            return $this->crear($empleadoId, $articulosIds);
        });

        return $resguardo;
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

    public function evidenciarAcuse(Resguardo $resguardo, Archivo $acuseArchivo): void
    {
        if (! $this->esEvidenciable($resguardo)) {
            $this->evidenciaFallida();
        }

        DB::transaction(function () use ($resguardo, $acuseArchivo) {
            $this->reemplazarArchivoAction->handle($resguardo->archivo, $acuseArchivo);

            $resguardo->update([
                'estado_id' => ResguardoEstadoEnum::ACTIVO->value
            ]);
        });
    }
}
