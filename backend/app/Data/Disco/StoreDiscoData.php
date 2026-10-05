<?php

namespace App\Data\Disco;

use App\Data\Producto\ProductoVarianteData;
use App\Data\Producto\ProductoIdentidadData;

class StoreDiscoData extends ProductoVarianteData
{
    public function __construct(
        int $marcaId,
        string $modelo,
        public DiscoData $spec,
        ?int $tipoId = null,
    ) {
        parent::__construct($tipoId, $marcaId, $modelo);
    }
}
