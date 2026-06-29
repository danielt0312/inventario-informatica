<?php

namespace App\Enums;

use App\Traits\Enums\IsCatalog;

enum DictamenEstadoEnum: int
{
    use IsCatalog;

    case DICTAMINAR = 1;
    case EVIDENCIAR = 2;
    case SURTIR = 3;
    case INVENTARIAR = 4;
    case RESGUARDAR = 5;
    case SURTIDO = 6;
    case SURTIDO_PARCIAL = 7;

    public function label(): string
    {
        return match($this) {
            self::DICTAMINAR => 'Por Dictaminar',
            self::EVIDENCIAR => 'Evidenciar Requisición',
            self::SURTIR => 'Por Surtir',
            self::INVENTARIAR => 'Por Inventariar',
            self::RESGUARDAR => 'Por Resguardar',
            self::SURTIDO => 'Surtido',
            self::SURTIDO_PARCIAL => 'Surtido Parcial'
        };
    }

    public static function esDictaminar(int $value): bool
    {
        return self::DICTAMINAR->value === $value;
    }

    public static function esEvidenciar(int $value): bool
    {
        return self::EVIDENCIAR->value === $value;
    }

    public static function esSurtir(int $value): bool
    {
        return self::SURTIR->value === $value;
    }
}
