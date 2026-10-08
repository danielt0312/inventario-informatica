<?php

namespace App\Data\Dictamen;

use Spatie\LaravelData\Data;
use Spatie\LaravelData\Mappers\SnakeCaseMapper;
use App\Data\Producto\ProductoVarianteData;
use Spatie\LaravelData\Attributes\{
    MapInputName,
    MapOutputName
};

#[MapInputName(SnakeCaseMapper::class)]
#[MapOutputName(SnakeCaseMapper::class)]
class InventariarDictamenAdquisicionData extends Data
{
    public function __construct(
        public int $id,
        public InventariarDictamenArticuloData $articulo,
        public bool $esResultadoEsperado,
        public ?string $observaciones = null,
    ) {}
}
