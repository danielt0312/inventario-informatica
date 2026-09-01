<?php

namespace App\Enums;

use App\Traits\Enums\IsCatalog;

enum ArticuloEstadoEnum: int
{
    use IsCatalog;

    case ACTIVO = 1;
    case BAJA_DEFINITIVA = 2;
    case BAJA_PREVENTIVA = 3;
    case MANTENIMIENTO = 4;
}
