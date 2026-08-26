<?php

namespace App\Services;

use App\Enums\ProductoTipoEnum;

class DictamenService
{
    public function productoTipoPuedeRequerirNumeroInventario(ProductoTipoEnum $tipo)
    {
        return match($tipo) {
            ProductoTipoEnum::DISCO,
            ProductoTipoEnum::RAM,
            ProductoTipoEnum::BOCINA_AMBIENTAL,
            ProductoTipoEnum::CAMARA_WEB,
            ProductoTipoEnum::MONITOR,
            ProductoTipoEnum::UNIDAD_DISCO_OPTICO,
            ProductoTipoEnum::TECLADO,
            ProductoTipoEnum::MOUSE => true,
            default => false
        };
    }
}
