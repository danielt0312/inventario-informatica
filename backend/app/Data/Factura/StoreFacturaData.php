<?php

namespace App\Data\Factura;

use Spatie\LaravelData\Data;
use Spatie\LaravelData\Mappers\SnakeCaseMapper;
use Spatie\LaravelData\Attributes\{
    MapInputName,
    MapOutputName,
};

#[MapInputName(SnakeCaseMapper::class)]
#[MapOutputName(SnakeCaseMapper::class)]
class StoreFacturaData extends Data
{
    public function __construct(
        public string $folio,
        public string $fechaEmision,
        public int $proveedorId
    ) {}
}
