<?php

namespace App\Enums;

use InvalidArgumentException;
use Illuminate\Database\Eloquent\Model;
use App\Traits\HasFormattedLabel;
use App\Traits\Enums\IsCatalog;
use App\Models\{
    Oficio,
    DictamenVersion,
    Factura,
    OrdenCompra,
    Resguardo,
};

enum DocumentoTipoEnum: int
{
    use IsCatalog, HasFormattedLabel;

    case Oficio = 1;
    case DictamenVersion = 2;
    case Factura = 3;
    case OrdenCompra = 4;
    case Resguardo = 5;

    public function formattedLabel(): string
    {
        return match ($this) {
            self::Oficio            => 'Oficio solicitante',
            self::DictamenVersion   => 'Dictamen de Tecnologías',
            self::OrdenCompra       => 'Orden de Compra',
            self::Resguardo         => 'Resguardo de Bienes Informáticos',
        };
    }

    public function modelClass(): string
    {
        return match($this) {
            self::Oficio            => Oficio::class,
            self::DictamenVersion   => DictamenVersion::class,
            self::Factura           => Factura::class,
            self::OrdenCompra       => OrdenCompra::class,
            self::Resguardo         => Resguardo::class,
        };
    }

    public function morphAlias(): string
    {
        return match($this) {
            self::Oficio            => 'oficio',
            self::DictamenVersion   => 'dictamen_version',
            self::Factura           => 'factura',
            self::OrdenCompra       => 'orden_compra',
            self::Resguardo         => 'resguardo',
        };
    }

    public static function tryFromModel(Model|string $model): ?self
    {
        $class = is_object($model) ? $model::class : $model;

        return match($class) {
            Oficio::class           => self::Oficio,
            DictamenVersion::class  => self::DictamenVersion,
            Factura::class          => self::Factura,
            OrdenCompra::class      => self::OrdenCompra,
            Resguardo::class        => self::Resguardo,
            default                 => null,
        };
    }

    public static function fromModel(Model|string $model): self
    {
        $class = is_object($model) ? $model::class : $model;

        return self::tryFromModel($class)
            ?? throw new InvalidArgumentException("El modelo `{$class}` no se encuentra registrado como un tipo de documento válido.");
    }
}
