<?php

namespace App\Services;

use App\Models\Resguardo;
use App\Enums\ResguardoEstadoEnum;

class ResguardoService
{
    public function __construct(
        protected ArchivoService $archivoService,
    ) {}

    public function cancelar(Resguardo $resguardo): void
    {
        if ($resguardo->estado_id === ResguardoEstadoEnum::CANCELADO->value) {
            return;
        }

        $this->archivoService->cancelar($resguardo->archivo);

        $resguardo->update([
            'estado_id' => ResguardoEstadoEnum::CANCELADO->value
        ]);
    }
}
