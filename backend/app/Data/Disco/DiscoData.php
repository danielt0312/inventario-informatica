<?php

namespace App\Data\Disco;

use Spatie\LaravelData\Data;
use Spatie\LaravelData\Mappers\SnakeCaseMapper;
use Spatie\LaravelData\Attributes\{
    MapInputName,
    MapOutputName
};

#[MapInputName(SnakeCaseMapper::class)]
#[MapOutputName(SnakeCaseMapper::class)]
class DiscoData extends Data
{
    public function __construct(
        public int $tipoId,
        public int $capacidadId,
        public ?int $interfazId = null,
        public ?int $factorFormaId = null
    ) {}
}
