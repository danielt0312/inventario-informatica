<?php

namespace App\Services;

use App\Enums\{
    ArticuloEstadoEnum,
    ProductoTipoEnum,
};

class ArticuloService
{
    public function requiereRevision(ProductoTipoEnum $tipo): bool
    {
        return match($tipo) {
            ProductoTipoEnum::COMPUTADORA_ESCRITORIO,
            ProductoTipoEnum::COMPUTADORA_PORTATIL,
            ProductoTipoEnum::IMPRESORA,
            ProductoTipoEnum::IMPRESORA_MULTIFUNCIONAL,
            ProductoTipoEnum::TELEFONO => true,
            default => false
        };
    }

    public function getEstadoEnum(int|ProductoTipoEnum $productoTipo): ArticuloEstadoEnum
    {
        if (is_int($productoTipo)) {
            $productoTipo = ProductoTipoEnum::tryFrom($productoTipo);
            if ($productoTipo === null) {
                return ArticuloEstadoEnum::ACTIVO;
            }
        }

        if ($this->requiereRevision($productoTipo)) {
            return ArticuloEstadoEnum::REVISION;
        }

        return ArticuloEstadoEnum::ACTIVO;
    }
}
