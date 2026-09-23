<?php

namespace App\Data\Dictamen;

use Spatie\LaravelData\Data;
use Spatie\LaravelData\Mappers\SnakeCaseMapper;

use Spatie\LaravelData\Attributes\{
    MapInputName,
    MapOutputName
};

#[MapInputName(SnakeCaseMapper::class)]
#[MapOutputName(SnakeCaseMapper::class)]
class InventariarDictamenArticuloData extends Data
{
    public function __construct(
        public int $dictamenAdquisicionId,
        public int $productoVarianteId,
        public int $facturaId,
        public string $cuentaContable,
        public string $esResultadoEsperado,
        public ?string $observaciones = null,
        public ?string $numeroSerie = null,
        public ?float $costoUnitario = null,
    ) {}
}
