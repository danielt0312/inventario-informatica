<?php

namespace App\Data\Dictamen;

use Spatie\LaravelData\Data;
use Spatie\LaravelData\Mappers\SnakeCaseMapper;
use Spatie\LaravelData\Attributes\MapInputName;

#[MapInputName(SnakeCaseMapper::class)]
class StoreDictamenAdquisicionData extends Data
{
    public function __construct(
        public int $cantidad,
        public int $empleadoId,
        public int $productoTipoId,
        public ?string $numeroInventario = null,
    ) {}
}
