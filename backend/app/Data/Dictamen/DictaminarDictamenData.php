<?php

namespace App\Data\Dictamen;

use Spatie\LaravelData\Data;
use Spatie\LaravelData\Attributes\DataCollectionOf;
use Spatie\LaravelData\Mappers\SnakeCaseMapper;
use Spatie\LaravelData\Attributes\MapInputName;

#[MapInputName(SnakeCaseMapper::class)]
class DictaminarDictamenData extends Data
{
    public function __construct(
        #[DataCollectionOf(DictaminarDictamenAdquisicionData::class)]
        public array $adquisiciones
    ) {}
}
