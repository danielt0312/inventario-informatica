<?php

namespace App\Contracts;

use Illuminate\Database\Eloquent\Casts\Attribute;

interface ProductoTipoDescriptivo
{
    public function productoTipoDescripcion(): Attribute;
}
