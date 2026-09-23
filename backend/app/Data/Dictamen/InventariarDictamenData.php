<?php

namespace App\Data\Dictamen;

use Spatie\LaravelData\Data;
use Spatie\LaravelData\Attributes\DataCollectionOf;

class InventariarDictamenData extends Data
{
    public function __construct(
        #[DataCollectionOf(InventariarDictamenArticuloData::class)]
        public array $articulos
    ) {}
}
