<?php

namespace App\Data\Disco;

use Spatie\LaravelData\Data;
use App\Data\Producto\ProductoIdentidadData;

class StoreDiscoData extends Data
{
    public function __construct(
        public ProductoIdentidadData $producto,
        public DiscoData $disco
    ) {}
}
