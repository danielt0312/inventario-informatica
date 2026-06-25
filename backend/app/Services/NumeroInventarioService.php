<?php

namespace App\Services;

use App\Enums\NumeroInventarioEnum;

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

    public static function generate(int $prefix, int $suffix, NumeroInventarioEnum $case = self::DEFAULT): string
    {
        return $case->generate($prefix, $suffix);
    }

}
