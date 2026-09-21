<?php

namespace App\Enums;

use App\Traits\Enums\IsCatalog;

enum ArticuloEstadoEnum: int
{
    use IsCatalog;

    case Activo         = 1;
    case BajaDefinitiva = 2;
    case BajaPreventiva = 3;
}
