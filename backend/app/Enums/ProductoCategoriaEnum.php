<?php

namespace App\Enums;

use App\Traits\HasLabel;
use App\Traits\Enums\IsCatalog;

enum ProductoCategoriaEnum: int
{
    use HasLabel, IsCatalog;

    case COMPUTADORA = 1;
    case DISPOSITIVO_ALMACENAMIENTO = 2;
    case MEMORIA_ACCESO_ALEATORIO = 3;
    case TELEFONIA = 4;
    case REDES = 5;
    case HERRAMIENTA = 6;
    case AUDIO = 7;
    case CAMARA_VIDEO = 8;
    case PROYECCION = 9;
    case IMPRESORA = 10;
    case PERIFERICO = 11;
    case ELECTRICO = 12;
    case ESCANER = 13;

    public function label(): string
    {
        return match($this) {
            self::DISPOSITIVO_ALMACENAMIENTO => 'Dispositivo de Almacenamiento',
            self::MEMORIA_ACCESO_ALEATORIO => 'Memoria de Acceso Aleatorio',
            self::TELEFONIA => 'Telefonía',
            self::CAMARA_VIDEO => 'Cámara y Video',
            self::PROYECCION => 'Proyección',
            self::PERIFERICO => 'Periférico',
            self::ELECTRICO => 'Eléctrico',
            self::ESCANER => 'Escáner'
        };
    }
}
