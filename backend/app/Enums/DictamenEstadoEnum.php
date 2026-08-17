<?php

namespace App\Enums;

use App\Traits\Enums\IsCatalog;

enum DictamenEstadoEnum: int
{
    use IsCatalog;

    case DICTAMINAR = 1;
    case EVIDENCIAR = 2;
    case SURTIR = 3;
    case INVENTARIAR = 4;
    case SURTIDO = 5;

    public function label(): string
    {
        return match($this) {
            self::DICTAMINAR => 'Por Dictaminar',
            self::EVIDENCIAR => 'Evidenciar Confirmado de Recibido',
            self::SURTIR => 'Por Surtir',
            self::INVENTARIAR => 'Por Inventariar',
            self::SURTIDO => 'Surtido',
        };
    }
}
