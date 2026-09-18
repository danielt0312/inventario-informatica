<?php

namespace App\Data\Dictamen;

use Spatie\LaravelData\Data;
use App\Data\Oficio\StoreOficioData;
use Spatie\LaravelData\Attributes\DataCollectionOf;
use Spatie\LaravelData\Mappers\SnakeCaseMapper;
use Spatie\LaravelData\Attributes\MapInputName;

#[MapInputName(SnakeCaseMapper::class)]
class StoreDictamenData extends Data
{
    public function __construct(
        public int $adscripcionId,
        public int $empleadoId,
        public StoreDictamenVersionData $version,

        #[DataCollectionOf(StoreDictamenAdquisicionData::class)]
        public array $adquisiciones,

        public StoreOficioData|null $oficio = null,

    ) {}
}
