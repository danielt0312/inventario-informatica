<?php

namespace App\Data\Oficio;

use Spatie\LaravelData\Data;

class StoreOficioData extends Data
{
    public function __construct(
        public string $folio
    ) {}
}
