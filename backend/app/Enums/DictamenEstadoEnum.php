<?php

namespace App\Enums;

use App\Traits\HasFormattedLabel;
use App\Traits\Enums\IsCatalog;

enum DictamenEstadoEnum: int
{
    use HasFormattedLabel, IsCatalog;

    case PorDictaminar = 1;
    case PendienteAcuse = 2;
    case PorSurtir = 3;
    case PorInventariar = 4;
    case Surtido = 5;
    case SurtidoParcial = 6;

    public function formattedLabel(): string
    {
        return match($this) {
            self::PendienteAcuse => 'Pendiente de Acuse',
        };
    }
}
