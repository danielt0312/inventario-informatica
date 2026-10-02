<?php

namespace App\Enums;

use App\Traits\Enums\IsCatalog;

enum ComputadoraTipoEnum: int
{
    use IsCatalog;

    case Escritorio = 1;
    case Portatil = 2;
    case Servidor = 3;
}
