<?php

namespace App\Data\Computadora;

use Spatie\LaravelData\Data;
use Spatie\LaravelData\Mappers\SnakeCaseMapper;
use Spatie\LaravelData\Attributes\MapInputName;
use App\Data\Producto\StoreProductoData;

#[MapInputName(SnakeCaseMapper::class)]
class StoreDiscoData extends Data
{
    public function __construct(
        public StoreProductoData $producto,
        public StoreDiscoData $disco
    ) {}
}
