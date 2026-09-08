<?php

namespace App\Support;

final class FileNameGenerator
{
    public static function forUuid(string $legibleTitle, string $uuid): string
    {
        $prepend = mb_strtoupper(str_replace(' ', '_', $legibleTitle), 'UTF-8');
        [,,,,$append] = explode('-', $uuid);
        return "$prepend-$append";
    }
}
