<?php

namespace App\Enums;

use App\Traits\HasFormattedLabel;
use App\Traits\Enums\IsCatalog;

enum ProductoCategoriaEnum: int
{
    use HasFormattedLabel, IsCatalog;

    case Computadora                = 1;
    case DispositivoAlmacenamiento  = 2;
    case Telefonia                  = 3;
    case Redes                      = 4;
    case Herramienta                = 5;
    case Audio                      = 6;
    case CamaraVideoSonido          = 7;
    case Impresora                  = 8;
    case Periferico                 = 9;
    case Electrico                  = 10;
    case Escaner                    = 11;

    public function formattedLabel(): string
    {
        return match($this) {
            self::DispositivoAlmacenamiento => 'Dispositivo de Almacenamiento',
            self::Telefonia => 'Telefonía',
            self::CamaraVideoSonido => 'Cámara, Video y Sonido',
            self::Periferico => 'Periférico',
            self::Electrico => 'Eléctrico',
            self::Escaner => 'Escáner'
        };
    }
}
