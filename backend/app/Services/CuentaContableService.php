<?php

namespace App\Services;

use App\Enums\{
    ArticuloEstadoEnum,
    ProductoTipoEnum,
};

class CuentaContableService
{
    final public const INVENTARIABLE_REGEX = '/^\d{4}-\d{1}-\d{4}$/';
    final public const NO_INVENTARIABLE = '2000';

    public static function esNoInventariable(string $value): bool
    {
        return $value === static::NO_INVENTARIABLE;
    }

    public static function esInventariable(string $value): bool
    {
        return (bool) preg_match(static::INVENTARIABLE_REGEX, $value);
    }

    public static function esValido(string $value): bool
    {
        return static::esNoInventariable($value) || static::esInventariable($value);
    }
}
