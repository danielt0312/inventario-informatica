<?php

namespace App\Enums;

use App\Traits\Enums\IsCatalog;
use App\Traits\HasFormattedLabel;

enum LicenciaTipoEnum: int
{
    use HasFormattedLabel, IsCatalog;

    case Aplicacion = 1;
    case SistemaOperativo = 2;

    public function formattedLabel(): string
    {
        return match ($this) {
            self::Aplicacion => 'Aplicación',
            self::SistemaOperativo => 'Sistema Operativo',
        };
    }
}
