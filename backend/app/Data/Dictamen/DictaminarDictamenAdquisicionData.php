<?php

namespace App\Data\Dictamen;

use Spatie\LaravelData\Data;
use Spatie\LaravelData\Mappers\SnakeCaseMapper;
use Spatie\LaravelData\Attributes\MapInputName;

#[MapInputName(SnakeCaseMapper::class)]
class DictaminarDictamenAdquisicionData extends Data
{
    public function __construct(
        public int $id,
        public int $productoVarianteId,
        public ?string $especificacionesTecnicas = null,
    ) {}
}
