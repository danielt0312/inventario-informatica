<?php

namespace App\Data\Producto;

use Spatie\LaravelData\Data;
use Spatie\LaravelData\Mappers\SnakeCaseMapper;
use Spatie\LaravelData\Attributes\{
    MapInputName,
    MapOutputName
};

#[MapInputName(SnakeCaseMapper::class)]
#[MapOutputName(SnakeCaseMapper::class)]
class ProductoIdentidadData extends Data
{
    public function __construct(
        public int $marcaId,
        public string $modelo
    ) {}
}
