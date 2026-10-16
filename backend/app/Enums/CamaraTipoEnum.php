<?php

namespace App\Enums;

use App\Traits\Enums\IsCatalog;
use App\Traits\HasFormattedLabel;

enum CamaraTipoEnum: int
{
    use IsCatalog, HasFormattedLabel;

    case VideoDigital = 1;
    case FotograficaDigital = 2;
    case Web = 3;

    public function formattedLabel(): string
    {
        return match ($this) {
            self::FotograficaDigital => 'Fotográfica Digital',
        };
    }

    public function descripcion(): string
    {
        return match ($this) {
            self::VideoDigital          => 'Cámara de Video Digital',
            self::FotograficaDigital    => 'Cámara Fotográfica Digital',
            self::Web                   => 'Cámara Web',
        };
    }
}
