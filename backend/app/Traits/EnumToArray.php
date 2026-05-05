<?php

namespace App\Traits;

trait EnumToArray
{
    /**
     * Devuelve los casos del Enum formateados como un array de arrays ['id' => ..., 'nombre' => ...].
     */
    public static function toFormattedArray(): array
    {
        return array_map(
            fn (self $case) => [
                'id' => $case->value,
                'nombre' => method_exists($case, 'nombre')
                    ? $case->nombre()
                    : $case->name,
            ],
            self::cases()
        );
    }
}
