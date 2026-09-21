<?php

namespace App\Data\Computadora;

use Spatie\LaravelData\Data;
use Spatie\LaravelData\Mappers\SnakeCaseMapper;
use Spatie\LaravelData\Attributes\MapInputName;

#[MapInputName(SnakeCaseMapper::class)]
class DiscoData extends Data
{
    public function __construct(
        public int $tipoId,
        public int $capacidadId,
        public ?int $interfazId,
        public ?int $factorFormaId,
    ) {}
}
