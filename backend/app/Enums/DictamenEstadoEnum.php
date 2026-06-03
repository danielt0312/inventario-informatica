<?php

namespace App\Enums;

use App\Traits\EnumToArray;

enum DictamenEstadoEnum: int
{
    use EnumToArray;

    case DICTAMINAR = 1;
    case EVIDENCIAR = 2;
    case SURTIR = 3;
    case INVENTARIAR = 4;
    case SURTIDO = 5;
    case SURTIDO_PARCIAL = 6;

    public function nombre(): string
    {
        return match($this) {
            self::DICTAMINAR => 'Por Dictaminar',
            self::EVIDENCIAR => 'Evidenciar Requisición',
            self::SURTIR => 'Por Surtir',
            self::INVENTARIAR => 'Por Inventariar',
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
