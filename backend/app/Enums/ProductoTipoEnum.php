<?php

namespace App\Enums;

use Illuminate\Database\Eloquent\Model;
use App\Traits\HasFormattedLabel;
use App\Traits\Enums\IsCatalog;

use App\Models\{
    Disco,
    Ram,
    Licencia,
    Computadora,
    Camara
};

enum ProductoTipoEnum: int
{
    use HasFormattedLabel, IsCatalog;

    case Computadora = 1;
    case Tablet = 2;
    case Disco = 3;
    case Ram = 4;
    case Telefono = 5;
    case AccessPoint = 6;
    case Antena = 7;
    case Firewall = 8;
    case Modem = 9;
    case PanelParcheo = 10;
    case Rack = 11;
    case Router = 12;
    case Switch = 13;
    case Adaptador = 14;
    case ModuloReceptor = 15;
    case ApuntadorOptico = 16;
    case CajaConectividad = 17;
    case LectorCodigos = 18;
    case RelojChecador = 19;
    case Bocina = 20;
    case Consola = 21;
    case Microfono = 22;
    case Camara = 23;
    case Concentrador = 24;
    case PantallaRetractil = 25;
    case Proyector = 26;
    case BarraVideo = 27;
    case Impresora = 28;
    case Plotter = 29;
    case Monitor = 30;
    case DiscoOptico = 31;
    case Teclado = 32;
    case Mouse = 33;
    case ModuloBateria = 34;
    case Ups = 35;
    case Escaner = 36;
    case Procesador = 37;
    case Licencia = 38;

    public function categoria(): ProductoCategoriaEnum
    {
        return match ($this) {
            self::Computadora,
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
            self::Escaner               => ProductoCategoriaEnum::Escaner
        };
    }

    public function formattedLabel(): string
    {
        return match($this) {
            self::Ram                   => 'RAM',
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
            self::Ups                   => 'UPS',
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
            default                     => ClasificadorEnum::ComputoTecnologiaInformacion
        };
    }

    public function varianteModelClass(): ?string
    {
        return match($this) {
            self::Disco         => Disco::class,
            self::Licencia      => Licencia::class,
            self::Computadora   => Computadora::class,
            self::Camara        => Camara::class,
            self::Ram           => Ram::class,
            default             => null
        };
    }

    public function varianteMorphAlias(): ?string
    {
        return match($this) {
            self::Disco         => 'disco',
            self::Licencia      => 'licencia',
            self::Computadora   => 'computadora',
            self::Camara        => 'camara',
            self::Ram           => 'ram',
            default             => null
        };
    }

    public static function tryFromVarianteModel(Model $model): ?self
    {
        return match (true) {
            $model instanceof Disco         => self::Disco,
            $model instanceof Licencia      => self::Licencia,
            $model instanceof Computadora   => self::Computadora,
            $model instanceof Camara        => self::Camara,
            $model instanceof Ram           => self::Ram,
            default => null,
        };
    }
}
