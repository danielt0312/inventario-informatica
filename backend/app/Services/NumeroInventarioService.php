<?php

namespace App\Services;

use App\Enums\{
    NumeroInventarioEnum,
    ClasificadorEnum
};

class NumeroInventarioService
{
    private const NumeroInventarioEnum DEFAULT = NumeroInventarioEnum::INFORMATICA;

    public static function regex(NumeroInventarioEnum $case = self::DEFAULT): string
    {
        return $case->regex();
    }

    public static function matches(string $value, NumeroInventarioEnum $case = self::DEFAULT): bool
    {
        return $case->matches($value);
    }

    public static function generate(ClasificadorEnum $clasificador, int $consecutivo, NumeroInventarioEnum $case = self::DEFAULT): string
    {
        return $case->generate($clasificador->value, $consecutivo);
    }

}
