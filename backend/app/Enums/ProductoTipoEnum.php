<?php

namespace App\Enums;

use App\Traits\HasFormattedLabel;
use App\Traits\Enums\IsCatalog;
use App\Models\{
    Disco,
    Licencia,
    Computadora,
    Camara,
};

enum ProductoTipoEnum: int
{
    use HasFormattedLabel, IsCatalog;

    case Computadora = 1;
    case Servidor = 2;
    case Tablet = 3;
    case Disco = 4;
    case Ram = 5;
    case Telefono = 6;
    case AccessPoint = 7;
    case Antena = 8;
    case Firewall = 9;
    case Modem = 10;
    case PanelParcheo = 11;
    case Rack = 12;
    case Router = 13;
    case Switch = 14;
    case Adaptador = 15;
    case ModuloReceptor = 16;
    case ApuntadorOptico = 17;
    case CajaConectividad = 18;
    case LectorCodigos = 19;
    case RelojChecador = 20;
    case Bocina = 21;
    case Consola = 22;
    case Microfono = 23;
    case Camara = 24;
    case Concentrador = 25;
    case PantallaRetractil = 26;
    case Proyector = 27;
    case BarraVideo = 28;
    case Impresora = 29;
    case Plotter = 30;
    case Monitor = 31;
    case DiscoOptico = 32;
    case Teclado = 33;
    case Mouse = 34;
    case ModuloBateria = 35;
    case Ups = 36;
    case Escaner = 37;
    case Procesador = 38;
    case Licencia = 39;

    public function categoria(): ProductoCategoriaEnum
    {
        return match ($this) {
            self::Computadora,
            self::Servidor,
            self::Licencia,
            self::Procesador,
            self::Ram,
            self::Tablet                => ProductoCategoriaEnum::Computadora,
            self::Disco                 => ProductoCategoriaEnum::DispositivoAlmacenamiento,
            self::Telefono              => ProductoCategoriaEnum::Telefonia,
            self::AccessPoint,
            self::Antena,
            self::Firewall,
            self::Modem,
            self::PanelParcheo,
            self::Rack,
            self::Router,
            self::Switch,
            self::Adaptador,
            self::ModuloReceptor        => ProductoCategoriaEnum::Redes,
            self::ApuntadorOptico,
            self::CajaConectividad,
            self::LectorCodigos,
            self::RelojChecador         => ProductoCategoriaEnum::Herramienta,
            self::Bocina,
            self::Consola,
            self::Microfono,
            self::Camara,
            self::Concentrador,
            self::PantallaRetractil,
            self::Proyector,
            self::BarraVideo            => ProductoCategoriaEnum::CamaraVideoSonido,
            self::Impresora,
            self::Plotter               => ProductoCategoriaEnum::Impresora,
            self::Monitor,
            self::DiscoOptico,
            self::Teclado,
            self::Mouse                 => ProductoCategoriaEnum::Periferico,
            self::ModuloBateria,
            self::Ups                   => ProductoCategoriaEnum::Electrico,
            self::Escaner               => ProductoCategoriaEnum::Escaner,
        };
    }

    public function formattedLabel(): string
    {
        return match($this) {
            self::Ram                   => 'Ram',
            self::Telefono              => 'Teléfono',
            self::Modem                 => 'Módem',
            self::PanelParcheo          => 'Panel de Parcheo',
            self::ModuloReceptor        => 'Módulo Receptor',
            self::ApuntadorOptico       => 'Apuntador Óptico',
            self::CajaConectividad      => 'Caja de Conectividad',
            self::LectorCodigos         => 'Lector de Códigos',
            self::Microfono             => 'Micrófono',
            self::Camara                => 'Cámara',
            self::PantallaRetractil     => 'Pantalla Retráctil',
            self::BarraVideo            => 'Barra de Video',
            self::DiscoOptico           => 'Disco Óptico',
            self::ModuloBateria         => 'Módulo de Baterias',
            self::Ups                   => 'Ups',
            self::Escaner               => 'Escáner'
        };
    }

    public function clasificador(): ClasificadorEnum
    {
        return match($this) {
            self::Consola,
            self::Microfono,
            self::PantallaRetractil,
            self::Proyector,
            self::Bocina                => ClasificadorEnum::Audiovisual,
            self::Camara                => ClasificadorEnum::CamaraFotograficaVideo,
            self::Telefono              => ClasificadorEnum::ComunicacionTelecomunicacion,
            self::Ups                   => ClasificadorEnum::ElectricoGeneracionElectrica,
            self::Licencia              => ClasificadorEnum::LicenciaInformaticaIntelectual,
            default                     => ClasificadorEnum::ComputoTecnologiaInformacion,
        };
    }

    public function varianteModelClass(): ?string
    {
        return match($this) {
            self::Disco         => Disco::class,
            self::Licencia      => Licencia::class,
            self::Computadora   => Computadora::class,
            self::Camara        => Camara::class,
            default             => null,
        };
    }

    public function varianteMorphAlias(): ?string
    {
        return match($this) {
            self::Disco         => 'disco',
            self::Licencia      => 'licencia',
            self::Computadora   => 'computadora',
            self::Camara        => 'camara',
            default             => null,
        };
    }

    public static function tryFromVarianteModel(Model|string $model): ?self
    {
        $class = is_object($model) ? $model::class : $model;

        return match($class) {
            Disco::class       => self::Disco,
            Licencia::class    => self::Licencia,
            Computadora::class => self::Computadora,
            Camara::class      => self::Camara,
            default            => null,
        };
    }
}
