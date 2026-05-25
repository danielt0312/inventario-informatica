<?php

namespace App\Enums;

use App\Traits\EnumToArray;

enum DictamenEstadoEnum: int
{
    use EnumToArray;

    case POR_DICTAMINAR     = 1;
    case REQUISITADO        = 2;
    case POR_SURTIR         = 3;
    case SURTIDO            = 4;
    case SURTIDO_PARCIAL    = 5;

    public function nombre(): string {
        return match($this) {
            self::POR_DICTAMINAR => 'Por Dictaminar',
            self::REQUISITADO => 'Requisitado',
            self::POR_SURTIR => 'Por Surtir',
            self::SURTIDO => 'Surtido',
            self::SURTIDO_PARCIAL => 'Surtido Parcial'
        };
    }
}
