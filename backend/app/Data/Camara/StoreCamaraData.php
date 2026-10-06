<?php

namespace App\Data\Camara;

use App\Data\Producto\ProductoVarianteData;
use App\Data\Producto\ProductoIdentidadData;
use Spatie\LaravelData\Mappers\SnakeCaseMapper;
use Spatie\LaravelData\Attributes\{
    MapInputName,
    MapOutputName
};

#[MapInputName(SnakeCaseMapper::class)]
#[MapOutputName(SnakeCaseMapper::class)]
class StoreCamaraData extends ProductoVarianteData
{
    public function __construct(
        int $marcaId,
        string $modelo,
        public CamaraData $spec,
        ?int $tipoId = null,
    ) {
        parent::__construct(
            tipoId: $tipoId,
            marcaId: $marcaId,
            modelo: $modelo
        );
    }
}
