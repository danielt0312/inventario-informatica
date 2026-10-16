<?php

namespace App\Enums;

use App\Traits\Enums\IsCatalog;
use App\Traits\HasFormattedLabel;

enum ComputadoraTipoEnum: int
{
    use IsCatalog, HasFormattedLabel;

    case Escritorio = 1;
    case Portatil = 2;
    case Servidor = 3;

    public function formattedLabel(): string
    {
        return match($this) {
            self::Portatil => 'Portátil'
        };
    }

    public function descripcion(): string
    {
        return match ($this) {
            ComputadoraTipoEnum::Escritorio => 'Computadora de Escritorio',
            ComputadoraTipoEnum::Portatil   => 'Computadora Portátil',
            ComputadoraTipoEnum::Servidor   => 'Servidor',
        };
    }
}
