<?php

namespace App\Data\Dictamen;

use Spatie\LaravelData\Data;
use Spatie\LaravelData\Mappers\SnakeCaseMapper;
use Spatie\LaravelData\Attributes\MapInputName;

#[MapInputName(SnakeCaseMapper::class)]
class CorregirDictamenAdquisicionData extends Data
{
    public function __construct(
        public int $cantidad,
        public int $empleadoId,
        public int $productoVarianteId,
        public ?string $articuloId = null,
        public ?string $especificacionesTecnicas = null,
    ) {}
}
