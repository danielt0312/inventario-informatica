<?php

namespace App\Enums;

use App\Traits\HasFormattedLabel;
use App\Traits\Enums\IsCatalog;

enum ProductoTipoEnum: int
{
    use HasFormattedLabel, IsCatalog;

    case COMPUTADORA = 1;
    case SERVIDOR = 2;
    case TABLET = 3;
    case DISCO = 4;
    case RAM = 5;
    case TELEFONO = 6;
    case ACCESS_POINT = 7;
    case ANTENA = 8;
    case FIREWALL = 9;
    case MODEM = 10;
    case PANEL_PARCHEO = 11;
    case RACK = 12;
    case ROUTER = 13;
    case SWITCH = 14;
    case ADAPTADOR = 15;
    case MODULO_RECEPTOR = 16;
    case APUNTADOR_OPTICO = 17;
    case CAJA_CONECTIVIDAD = 18;
    case LECTOR_CODIGOS = 19;
    case RELOJ_CHECADOR = 20;
    case BOCINA = 21;
    case CONSOLA = 22;
    case MICROFONO = 23;
    case CAMARA = 24;
    case CONCENTRADOR = 25;
    case PANTALLA_RETRACTIL = 26;
    case PROYECTOR = 27;
    case BARRA_VIDEO = 28;
    case IMPRESORA = 29;
    case PLOTTER = 30;
    case MONITOR = 31;
    case DISCO_OPTICO = 32;
    case TECLADO = 33;
    case MOUSE = 34;
    case MODULO_BATERIA = 35;
    case UPS = 36;
    case ESCANER = 37;
    case PROCESADOR = 38;
    case LICENCIA = 39;

    public function categoria(): ProductoCategoriaEnum
    {
        return match ($this) {
            self::COMPUTADORA,
            self::SERVIDOR,
            self::LICENCIA,
            self::PROCESADOR,
            self::RAM,
            self::TABLET                => ProductoCategoriaEnum::COMPUTADORA,
            self::DISCO                 => ProductoCategoriaEnum::DISPOSITIVO_ALMACENAMIENTO,
            self::TELEFONO              => ProductoCategoriaEnum::TELEFONIA,
            self::ACCESS_POINT,
            self::ANTENA,
            self::FIREWALL,
            self::MODEM,
            self::PANEL_PARCHEO,
            self::RACK,
            self::ROUTER,
            self::SWITCH,
            self::ADAPTADOR,
            self::MODULO_RECEPTOR       => ProductoCategoriaEnum::REDES,
            self::APUNTADOR_OPTICO,
            self::CAJA_CONECTIVIDAD,
            self::LECTOR_CODIGOS,
            self::RELOJ_CHECADOR        => ProductoCategoriaEnum::HERRAMIENTA,
            self::BOCINA,
            self::CONSOLA,
            self::MICROFONO,
            self::CAMARA,
            self::CONCENTRADOR,
            self::PANTALLA_RETRACTIL,
            self::PROYECTOR,
            self::BARRA_VIDEO           => ProductoCategoriaEnum::CAMARA_VIDEO_SONIDO,
            self::IMPRESORA,
            self::PLOTTER               => ProductoCategoriaEnum::IMPRESORA,
            self::MONITOR,
            self::DISCO_OPTICO,
            self::TECLADO,
            self::MOUSE                 => ProductoCategoriaEnum::PERIFERICO,
            self::MODULO_BATERIA,
            self::UPS                   => ProductoCategoriaEnum::ELECTRICO,
            self::ESCANER               => ProductoCategoriaEnum::ESCANER,
        };
    }

    public function formattedLabel(): string
    {
        return match($this) {
            self::RAM                   => 'RAM',
            self::TELEFONO              => 'Teléfono',
            self::MODEM                 => 'Módem',
            self::PANEL_PARCHEO         => 'Panel de Parcheo',
            self::MODULO_RECEPTOR       => 'Módulo Receptor',
            self::APUNTADOR_OPTICO      => 'Apuntador Óptico',
            self::CAJA_CONECTIVIDAD     => 'Caja de Conectividad',
            self::LECTOR_CODIGOS        => 'Lector de Códigos',
            self::MICROFONO             => 'Micrófono',
            self::CAMARA                => 'Cámara',
            self::PANTALLA_RETRACTIL    => 'Pantalla Retráctil',
            self::BARRA_VIDEO           => 'Barra de Video',
            self::DISCO_OPTICO          => 'Disco Óptico',
            self::MODULO_BATERIA        => 'Módulo de Baterias',
            self::UPS                   => 'UPS',
            self::ESCANER               => 'Escáner'
        };
    }

    public function clasificador(): ClasificadorEnum
    {
        return match($this) {
            self::CONSOLA,
            self::MICROFONO,
            self::PANTALLA_RETRACTIL,
            self::PROYECTOR,
            self::BOCINA                => ClasificadorEnum::AUDIOVISUAL,
            self::CAMARA_FOTOGRAFICA,
            self::CAMARA_VIDEO          => ClasificadorEnum::CAMARA_FOTOGRAFICA_VIDEO,
            self::TELEFONO              => ClasificadorEnum::COMUNICACION_TELECOMUNICACION,
            self::UPS                   => ClasificadorEnum::ELECTRICO_GENERACION_ELECTRICA,
            self::LICENCIA              => ClasificadorEnum::LICENCIA_INFORMATICA_INTELECTUAL,
            default                     => ClasificadorEnum::COMPUTO_TECNOLOGIA_INFORMACION,
        };
    }
}
