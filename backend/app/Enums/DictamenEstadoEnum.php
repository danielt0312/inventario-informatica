<?php

namespace App\Enums;

use App\Traits\Enums\IsCatalog;

enum DictamenEstadoEnum: int
{
    use IsCatalog;

    case Dictaminar = 1;
    case PendienteAcuse = 2;
    case Surtir = 3;
    case Inventariar = 4;
    case Surtido = 5;
    case SurtidoParcial = 6;

    public function formattedLabel(): string
    {
        return match($this) {
            self::Dictaminar => 'Por Dictaminar',
            self::PendienteAcuse => 'Pendiente de Acuse',
            self::Surtir => 'Por Surtir',
            self::Inventariar => 'Por Inventariar',
        };
    }
}
