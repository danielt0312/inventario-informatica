<?php

namespace App\Enums;

use App\Traits\Enums\IsCatalog;

enum ArticuloEstadoEnum: int
{
    use IsCatalog;

    case Activo         = 1;
    case BajaPreventiva = 2;
    case BajaDefinitiva = 3;
}
