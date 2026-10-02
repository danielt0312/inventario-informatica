<?php

namespace App\Enums;

use App\Traits\Enums\IsCatalog;

enum CamaraTipoEnum: int
{
    use IsCatalog;

    case VideoDigital = 1;
    case FotograficaDigital = 2;
    case Web = 3;
}
