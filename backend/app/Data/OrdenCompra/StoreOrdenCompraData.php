<?php

namespace App\Data\OrdenCompra;

use Spatie\LaravelData\Data;
use Spatie\LaravelData\Mappers\SnakeCaseMapper;
use Spatie\LaravelData\Attributes\{
    MapInputName,
    MapOutputName,
};

#[MapInputName(SnakeCaseMapper::class)]
#[MapOutputName(SnakeCaseMapper::class)]
class StoreOrdenCompraData extends Data
{
    public function __construct(
        public string $fechaSolicitud,
        public string $numeroOrden,
        public int $proveedorId
    ) {}
}
