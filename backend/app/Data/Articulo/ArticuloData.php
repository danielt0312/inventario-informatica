<?php

namespace App\Data\ArticuloData;

use Spatie\LaravelData\Data;
use Spatie\LaravelData\Mappers\SnakeCaseMapper;
use Spatie\LaravelData\Attributes\MapInputName;
use Spatie\LaravelData\Attributes\DataCollectionOf;
use App\Data\Disco\StoreDiscoData;

#[MapInputName(SnakeCaseMapper::class)]
class ArticuloData extends Data
{
    public function __construct(
        public int $productoVarianteId,
        public ?string $numeroSerie = null,
        public ?float $costoUnitario = null,
        public ?int $facturaId = null,
        public ?string $cuentaContable = null,
    ) {}
}
