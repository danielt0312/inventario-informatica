<?php

namespace App\Data\Ram;

use Spatie\LaravelData\Data;
use Spatie\LaravelData\Mappers\SnakeCaseMapper;
use Spatie\LaravelData\Attributes\{
    MapInputName,
    MapOutputName
};

#[MapInputName(SnakeCaseMapper::class)]
#[MapOutputName(SnakeCaseMapper::class)]
class RamData extends Data
{
    public function __construct(
        public int $tipoId,
        public int $capacidadId,
        public ?int $velocidadId = null
    ) {}
}
