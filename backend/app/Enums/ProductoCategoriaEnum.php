<?php

namespace App\Enums;

use App\Traits\HasFormattedLabel;
use App\Traits\Enums\IsCatalog;

enum ProductoCategoriaEnum: int
{
    use HasFormattedLabel, IsCatalog;

    case COMPUTADORA = 1;
    case DISPOSITIVO_ALMACENAMIENTO = 2;
    case TELEFONIA = 3;
    case REDES = 4;
    case HERRAMIENTA = 5;
    case AUDIO = 6;
    case CAMARA_VIDEO_SONIDO = 7;
    case IMPRESORA = 8;
    case PERIFERICO = 9;
    case ELECTRICO = 10;
    case ESCANER = 11;

    public function formattedLabel(): string
    {
        return match($this) {
            self::DISPOSITIVO_ALMACENAMIENTO => 'Dispositivo de Almacenamiento',
            self::TELEFONIA => 'Telefonía',
            self::CAMARA_VIDEO_SONIDO => 'Cámara, Video y Sonido',
            self::PERIFERICO => 'Periférico',
            self::ELECTRICO => 'Eléctrico',
            self::ESCANER => 'Escáner'
        };
    }
}
