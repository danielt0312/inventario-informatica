<?php

namespace App\Support;

class FilePathGenerator
{
    public static function forUuid(string $uuid, string $extension): string
    {
        return sprintf('%s/%s/%s.%s',
            substr($uuid, 0, 2),
            substr($uuid, 2, 2),
            $uuid,
            $extension
        );
    }
}
