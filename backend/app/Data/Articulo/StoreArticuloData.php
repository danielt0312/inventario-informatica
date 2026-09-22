<?php

namespace App\Data\Articulo;

use Spatie\LaravelData\Data;
use Spatie\LaravelData\Mappers\SnakeCaseMapper;
use Spatie\LaravelData\Attributes\MapInputName;
use Spatie\LaravelData\Attributes\DataCollectionOf;
use App\Data\Disco\StoreDiscoData;

#[MapInputName(SnakeCaseMapper::class)]
class StoreArticuloData extends Data
{
    public function __construct(
        public int $productoVarianteId,
        public int $facturaId,
        public int $dictamenId,
        public string $cuentaContable,
        public string $esResultadoEsperado,
        public string $observaciones,
        public ?string $numeroSerie = null,
        public ?float $costoUnitario = null,
    ) {}
}
