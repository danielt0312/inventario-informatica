<?php

namespace App\Enums;

use App\Traits\EnumToArray;

enum DictamenEstadoEnum: int
{
    use EnumToArray;

    case POR_SURTIR         = 1;
    case SURTIDO            = 2;
    case SURTIDO_PARCIAL    = 3;

    public function nombre(): string {
        return match($this) {
            self::POR_SURTIR => 'Por Surtir',
            self::SURTIDO => 'Baja definitiva',
            self::SURTIDO_PARCIAL => 'Baja preventiva'
        };
    }
}
