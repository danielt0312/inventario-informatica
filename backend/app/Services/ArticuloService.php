<?php

namespace App\Services;

use App\Enums\{
    ArticuloEstadoEnum,
    ProductoTipoEnum,
};

class ArticuloService
{
    final public const CUENTA_CONTABLE_INVENTARIABLE_REGEX = '/^\d{4}-\d{1}-\d{4}$/';
    final public const CUENTA_CONTABLE_NO_INVENTARIABLE = '2000';

    public static function esCuentaContableNoInventariable(string $value): bool
    {
        return $value === static::CUENTA_CONTABLE_NO_INVENTARIABLE;
    }

    public static function esCuentaContableInventariable(string $value): bool
    {
        return (bool) preg_match(static::CUENTA_CONTABLE_INVENTARIABLE_REGEX, $value);
    }

    public static function esCuentaContable(string $value): bool
    {
        return static::esCuentaContableNoInventariable($value) || static::esCuentaContableInventariable($value);
    }

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
