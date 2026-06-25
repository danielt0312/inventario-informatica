<?php

namespace App\Services;

use App\Enums\ProductoTipoEnum;

class DictamenService
{
    public function productoRequiereNumeroInventario(ProductoTipoEnum $tipo)
    {
        return match($tipo) {
            ProductoTipoEnum::RAM,
            ProductoTipoEnum::MONITOR,
            ProductoTipoEnum::DISCO,
            ProductoTipoEnum::TECLADO,
            ProductoTipoEnum::CAMARA_WEB,
            ProductoTipoEnum::BOCINA_AMBIENTAL,
            ProductoTipoEnum::UNIDAD_DISCO_OPTICO => true,
            default => false
        };
    }
}
