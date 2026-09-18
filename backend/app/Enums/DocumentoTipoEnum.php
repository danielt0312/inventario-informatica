<?php

namespace App\Enums;

use InvalidArgumentException;
use Illuminate\Database\Eloquent\Model;
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
    use IsCatalog;

    case OFICIO = 1;
    case DICTAMEN = 2;
    case FACTURA = 3;
    case ORDEN_COMPRA = 4;
    case RESGUARDO = 5;

    public function formattedLabel(): string
    {
        return match ($this) {
            self::OFICIO        => 'Oficio solicitante',
            self::DICTAMEN      => 'Dictamen de Tecnologías',
            self::ORDEN_COMPRA  => 'Orden de Compra',
            self::RESGUARDO     => 'Resguardo de Bienes Informáticos',
        };
    }

    public function modelClass(): string
    {
        return match($this) {
            self::OFICIO        => Oficio::class,
            self::DICTAMEN      => DictamenVersion::class,
            self::FACTURA       => Factura::class,
            self::ORDEN_COMPRA  => OrdenCompra::class,
            self::RESGUARDO     => Resguardo::class,
        };
    }

    public function morphAlias(): string
    {
        return match($this) {
            self::OFICIO        => 'oficio',
            self::DICTAMEN      => 'dictamen',
            self::FACTURA       => 'factura',
            self::ORDEN_COMPRA  => 'orden_compra',
            self::RESGUARDO     => 'resguardo',
        };
    }

    public static function tryFromModel(Model|string $model): ?self
    {
        $class = is_object($model) ? $model::class : $model;

        return match($class) {
            Oficio::class           => self::OFICIO,
            DictamenVersion::class  => self::DICTAMEN,
            Factura::class          => self::FACTURA,
            OrdenCompra::class      => self::ORDEN_COMPRA,
            Resguardo::class        => self::RESGUARDO,
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
