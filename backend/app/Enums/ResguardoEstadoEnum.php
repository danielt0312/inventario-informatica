<?php

namespace App\Enums;

use App\Traits\Enums\IsCatalog;

enum ResguardoEstadoEnum: int
{
    use IsCatalog;

    case ACTIVO = 1;
    case CANCELADO = 2;
}
