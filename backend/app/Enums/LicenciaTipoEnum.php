<?php

namespace App\Enums;

use App\Traits\Enums\IsCatalog;
use App\Traits\HasFormattedLabel;

enum LicenciaTipoEnum: int
{
    use HasFormattedLabel, IsCatalog;

    case APLICACION = 1;
    case SISTEMA_OPERATIVO = 2;

    public function formattedLabel(): string
    {
        return match ($this) {
            self::APLICACION => 'de Aplicación',
            self::SISTEMA_OPERATIVO => 'de Sistema Operativo',
        };
    }
}
