<?php

namespace App\Data\Procesador;

use Spatie\LaravelData\Data;
use Spatie\LaravelData\Mappers\SnakeCaseMapper;
use Spatie\LaravelData\Attributes\{
    MapInputName,
    MapOutputName
};

#[MapInputName(SnakeCaseMapper::class)]
#[MapOutputName(SnakeCaseMapper::class)]
class ProcesadorData extends Data
{
    public function __construct(
        public ?int $nucleos = null,
        public ?int $hilos = null,
        public ?float $frecuenciaMaximaGhz = null,
    ) {}
}
