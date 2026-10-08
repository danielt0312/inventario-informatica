<?php

namespace App\Data\Articulo;

use Spatie\LaravelData\Data;
use Spatie\LaravelData\Mappers\SnakeCaseMapper;

use Spatie\LaravelData\Attributes\{
    MapInputName,
    MapOutputName
};

#[MapInputName(SnakeCaseMapper::class)]
#[MapOutputName(SnakeCaseMapper::class)]
class StoreArticuloData extends Data
{
    public function __construct(
        public int $productoVarianteId,
        public int $facturaId,
        public int $dictamenId,
        public string $cuentaContable,
        public ?string $numeroSerie = null,
        public ?float $costoUnitario = null,
    ) {}
}
