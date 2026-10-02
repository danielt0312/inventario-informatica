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
class StoreDictamenAdquisicionData extends Data
{
    public function __construct(
        public int $cantidad,
        public int $empleadoId,
        public object $borradorProductoVariante,
        public ?string $caracteristicasAdicionales = null,
        public ?string $numeroInventario = null,
    ) {}
}
