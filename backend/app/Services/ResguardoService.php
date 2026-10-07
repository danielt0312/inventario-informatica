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
        protected DocumentoService $documentoService,
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
        return $resguardo->estado_id !== ResguardoEstadoEnum::Cancelado->value;
    }

    public function cancelar(Resguardo $resguardo): void
    {
        if (! $this->esCancelable($resguardo)) {
            $this->cancelacionFallida();
        }

        ($this->cancelarArchivoAction)($resguardo->archivo);

        $fechaCancelacion = now();

        DB::transaction(function () use ($resguardo, $fechaCancelacion) {
            $resguardo->update([
                'estado_id' => ResguardoEstadoEnum::Cancelado->value,
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
                'estado_id' => ResguardoEstadoEnum::PendienteAcuse->value,
                'fecha_actualizacion' => $fechaActual
            ]);

            // todo validar que los articulos realmente no se encuentren bajo resguardo
            $resguardo->articulosResguardados()->createMany($articulosPorResguardar);

            $this->generateAndAssociatePdf($resguardo);

            return $resguardo;
        });

        return $resguardo;
    }

    public function actualizar(int $empleadoId, array $articulosIds): Resguardo
    {
        return DB::transaction(function () use ($empleadoId, $articulosIds): Resguardo {
            $resguardoActual = Resguardo::firstWhere([
                ['empleado_id', $empleadoId],
                ['estado_id', '!=', ResguardoEstadoEnum::Cancelado->value]
            ]);

            if ($resguardoActual !== null) {
                $this->cancelar($resguardoActual);
            }

            return $this->crear($empleadoId, $articulosIds);
        });
    }

    protected function generateAndAssociatePdf(Resguardo $resguardo): void
    {
        $this->documentoService->enlazarArchivo(
            $resguardo,
            $this->generatePdf($resguardo)
        );
    }

    protected function generatePdf(Resguardo $resguardo): Archivo
    {
        $resguardo->loadMissing([
            'articulosResguardados.articulo.productoVariante.producto' => [
                'marca', 'tipo.categoria'
            ]
        ]);

        return $this->archivoService->createAndStoreFileFromRaw(
            $this->loadPdfView($resguardo)->output(),
            $this->generatePdfArchivoNombre($resguardo),
            'pdf'
        );
    }

    protected function generatePdfArchivoNombre(Resguardo $resguardo): string
    {
        return FileNameGenerator::forUuid(
            DocumentoTipoEnum::Resguardo->getLabelValue(),
            $resguardo->uuid
        );
    }

    protected function loadPdfView(Resguardo $resguardo, ?string $fileTitle = null)
    {
        $fileTitle ??= $this->generatePdfArchivoNombre($resguardo);
        return $this->pdfService->loadView('resguardo', compact('resguardo', 'fileTitle'));
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
        return $resguardo->estado_id === ResguardoEstadoEnum::PendienteAcuse->value;
    }

    public function evidenciarAcuse(Resguardo $resguardo, Archivo $acuseArchivo): void
    {
        if (! $this->esEvidenciable($resguardo)) {
            $this->evidenciaFallida();
        }

        DB::transaction(function () use ($resguardo, $acuseArchivo) {
            ($this->reemplazarArchivoAction)($resguardo->archivo, $acuseArchivo);

            $resguardo->update([
                'estado_id' => ResguardoEstadoEnum::Activo->value
            ]);
        });
    }
}
