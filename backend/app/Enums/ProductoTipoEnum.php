<?php

namespace App\Enums;

use App\Traits\HasLabel;
use App\Traits\Enums\IsCatalog;

enum ProductoTipoEnum: int
{
    use HasLabel, IsCatalog;

    case COMPUTADORA_ESCRITORIO = 1;
    case COMPUTADORA_PORTATIL = 2;
    case SERVIDOR = 3;
    case TABLET = 4;
    case DISCO = 5;
    case RAM = 6;
    case TELEFONO = 7;
    case ACCESS_POINT = 8;
    case ANTENA = 9;
    case FIREWALL = 10;
    case MODEM = 11;
    case PANEL_PARCHEO = 12;
    case RACK = 13;
    case ROUTER = 14;
    case SWITCH = 15;
    case ADAPTADOR = 16;
    case MODULO_RECEPTOR = 17;
    case APUNTADOR_OPTICO = 18;
    case CAJA_CONECTIVIDAD = 19;
    case LECTOR_CODIGOS = 20;
    case RELOJ_CHECADOR = 21;
    case BOCINA = 22;
    case BOCINA_AMBIENTAL = 23;
    case CONSOLA = 24;
    case MICROFONO = 25;
    case CAMARA_VIDEO = 26;
    case CAMARA_FOTOGRAFICA = 27;
    case CAMARA_WEB = 28;
    case CONCENTRADOR = 29;
    case PANTALLA_RETRACTIL = 30;
    case PROYECTOR = 31;
    case UNIDAD_VIDEO = 32;
    case IMPRESORA = 33;
    case IMPRESORA_MULTIFUNCIONAL = 34;
    case PLOTTER = 35;
    case MONITOR = 36;
    case UNIDAD_DISCO_OPTICO = 37;
    case TECLADO = 38;
    case MOUSE = 39;
    case MODULO_BATERIA = 40;
    case UPS = 41;
    case ESCANER = 42;

    public function categoria(): ProductoCategoriaEnum
    {
        return match ($this) {
            self::COMPUTADORA_ESCRITORIO,
            self::COMPUTADORA_PORTATIL,
            self::SERVIDOR,
            self::TABLET => ProductoCategoriaEnum::COMPUTADORA,
            self::DISCO => ProductoCategoriaEnum::DISPOSITIVO_ALMACENAMIENTO,
            self::RAM => ProductoCategoriaEnum::MEMORIA_ACCESO_ALEATORIO,
            self::TELEFONO => ProductoCategoriaEnum::TELEFONIA,
            self::ACCESS_POINT,
            self::ANTENA,
            self::FIREWALL,
            self::MODEM,
            self::PANEL_PARCHEO,
            self::RACK,
            self::ROUTER,
            self::SWITCH,
            self::ADAPTADOR,
            self::MODULO_RECEPTOR => ProductoCategoriaEnum::REDES,
            self::APUNTADOR_OPTICO,
            self::CAJA_CONECTIVIDAD,
            self::LECTOR_CODIGOS,
            self::RELOJ_CHECADOR => ProductoCategoriaEnum::HERRAMIENTA,
            self::BOCINA,
            self::BOCINA_AMBIENTAL,
            self::CONSOLA,
            self::MICROFONO => ProductoCategoriaEnum::AUDIO,
            self::CAMARA_VIDEO,
            self::CAMARA_FOTOGRAFICA,
            self::CAMARA_WEB => ProductoCategoriaEnum::CAMARA_VIDEO,
            self::CONCENTRADOR,
            self::PANTALLA_RETRACTIL,
            self::PROYECTOR,
            self::UNIDAD_VIDEO => ProductoCategoriaEnum::PROYECCION,
            self::IMPRESORA,
            self::IMPRESORA_MULTIFUNCIONAL,
            self::PLOTTER => ProductoCategoriaEnum::IMPRESORA,
            self::MONITOR,
            self::UNIDAD_DISCO_OPTICO,
            self::TECLADO,
            self::MOUSE => ProductoCategoriaEnum::PERIFERICO,
            self::MODULO_BATERIA,
            self::UPS => ProductoCategoriaEnum::ELECTRICO,
            self::ESCANER => ProductoCategoriaEnum::ESCANER
        };
    }

    public function label(): string
    {
        return match($this) {
            self::COMPUTADORA_ESCRITORIO => 'Computadora de Escritorio',
            self::COMPUTADORA_PORTATIL => 'Computadora Portátil',
            self::RAM => 'RAM',
            self::TELEFONO => 'Teléfono',
            self::MODEM => 'Módem',
            self::PANEL_PARCHEO => 'Panel de Parcheo',
            self::MODULO_RECEPTOR => 'Módulo Receptor',
            self::APUNTADOR_OPTICO => 'Apuntador Óptico',
            self::CAJA_CONECTIVIDAD => 'Caja de Conectividad',
            self::LECTOR_CODIGOS => 'Lector de Códigos',
            self::MICROFONO => 'Micrófono',
            self::CAMARA_VIDEO => 'Cámara de Video',
            self::CAMARA_FOTOGRAFICA => 'Cámara Fotográfica',
            self::CAMARA_WEB => 'Cámara Web',
            self::PANTALLA_RETRACTIL => 'Pantalla Retráctil',
            self::UNIDAD_VIDEO => 'Unidad de Video',
            self::UNIDAD_DISCO_OPTICO => 'Unidad de Disco Óptico',
            self::MODULO_BATERIA => 'Módulo de Baterias',
            self::UPS => 'UPS',
            self::ESCANER => 'Escáner'
        };
    }
}
