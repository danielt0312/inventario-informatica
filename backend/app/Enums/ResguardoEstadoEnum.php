<?php

namespace App\Enums;

use App\Traits\Enums\IsCatalog;
use App\Traits\HasFormattedLabel;

enum ResguardoEstadoEnum: int
{
    use HasFormattedLabel, IsCatalog;

    case Activo         = 1;
    case PendienteAcuse = 2;
    case Cancelado      = 3;

    public function formattedLabel(): string
    {
        return match ($this) {
            self::PendienteAcuse => 'Pendiente de Acuse',
        };
    }
}
