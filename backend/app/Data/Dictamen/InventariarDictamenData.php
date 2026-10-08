<?php

namespace App\Data\Dictamen;

use Spatie\LaravelData\Data;
use Spatie\LaravelData\Attributes\DataCollectionOf;

class InventariarDictamenData extends Data
{
    public function __construct(
        #[DataCollectionOf(InventariarDictamenAdquisicionData::class)]
        public array $adquisiciones
    ) {}
}
