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
class CorregirDictamenAdquisicionData extends Data
{
    public function __construct(
        public int $cantidad,
        public int $empleadoId,
        public ProductoVarianteData $productoVariante,
        public ?string $caracteristicasAdicionales = null,
        public ?string $numeroInventario = null,
    ) {}
}
