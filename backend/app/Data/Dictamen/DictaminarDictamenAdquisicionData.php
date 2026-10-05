<?php

namespace App\Data\Dictamen;

use Spatie\LaravelData\Data;
use Spatie\LaravelData\Mappers\SnakeCaseMapper;
use Spatie\LaravelData\Attributes\MapInputName;
use App\Data\Producto\ProductoVarianteData;

#[MapInputName(SnakeCaseMapper::class)]
class DictaminarDictamenAdquisicionData extends Data
{
    public function __construct(
        public int $id,
        public ProductoVarianteData $borradorProductoVariante,
        public ?string $caracteristicasAdicionales = null,
        public ?string $numeroInventario = null,
    ) {}
}
