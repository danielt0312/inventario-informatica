<?php

namespace App;

enum ArchivoTipoEnum: int
{
    case PDF = 1;
    case JPG = 2;

    public function nombre(): string {
        return match($this) {
            self::PDF => 'Adobe Portable Document Format',
            self::JPG => 'Imágen JPEG'
        };
    }

    public function extension(): string {
        return match($this) {
            self::PDF => 'pdf',
            self::JPG => 'jpg'
        };
    }
}
