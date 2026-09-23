<?php

namespace App\Data\Disco;

use Spatie\LaravelData\Data;
use App\Data\Producto\StoreProductoData;

class StoreDiscoData extends Data
{
    public function __construct(
        public StoreProductoData $producto,
        public StoreDiscoData $disco
    ) {}
}
