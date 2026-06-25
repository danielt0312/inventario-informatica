<?php

namespace App\Enums;

enum NumeroInventarioEnum: string
{
    case MUEBLES = '01';
    case INFORMATICA = '02';
    case VEHICULOS = '03';

    public function regex(): string
    {
        return "/^\d{3}-{$this->value}-\d{4}$/";
    }

    public function matches(string $value): bool
    {
        return (bool) preg_match($this->regex(), $value);
    }

    public function generate(int $prefix, int $suffix): string
    {
        $formattedPrefix = str_pad((string)$prefix, 3, '0', STR_PAD_LEFT);
        $formattedSuffix = str_pad((string)$suffix, 4, '0', STR_PAD_LEFT);

        return "{$formattedPrefix}-{$this->value}-{$formattedSuffix}";
    }
}
