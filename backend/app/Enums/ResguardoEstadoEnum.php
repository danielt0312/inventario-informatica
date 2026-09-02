<?php

namespace App\Enums;

use App\Traits\Enums\IsCatalog;
use App\Traits\HasFormattedLabel;

enum ResguardoEstadoEnum: int
{
    use HasFormattedLabel, IsCatalog;

    case ACTIVO = 1;
    case PENDIENTE_ACUSE = 2;
    case CANCELADO = 3;

    public function formattedLabel(): string
    {
        return match ($this) {
            self::PENDIENTE_ACUSE => 'Pendiente de Acuse',
        };
    }
}
