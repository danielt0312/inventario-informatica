<?php

namespace App\Data\Computadora;

use Spatie\LaravelData\Data;
use Spatie\LaravelData\Mappers\SnakeCaseMapper;
use Spatie\LaravelData\Attributes\MapInputName;
use Spatie\LaravelData\Attributes\DataCollectionOf;
use App\Data\Disco\StoreDiscoData;

#[MapInputName(SnakeCaseMapper::class)]
class StoreArticuloComputadoraData extends Data
{
    public function __construct(
        protected int $cpuProductoId,

        #[DataCollectionOf(StoreDiscoData::class)]
        protected array $disco,
    ) {}
}
