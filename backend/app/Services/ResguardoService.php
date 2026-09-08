<?php

namespace App\Services;

use App\Support\FileNameGenerator;
use App\Actions\CancelarArchivoAction;
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

    public function cancelarSiExiste(int $empleadoId): void
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
        $this->cancelarSiExiste($empleadoId);

        return $this->crear($empleadoId, $articulosIds);
    }
}
