<?php

namespace App\Support;

class FileNameGenerator
{
    public static function forUuid(string $legibleTitle, string $uuid7): string
    {
        $prepend = mb_strtoupper(str_replace(' ', '_', $this->legible()), 'UTF-8');
        [,,,,$append] = explode('-', $uuid7);
        return "$prepend-$append";
    }
}
