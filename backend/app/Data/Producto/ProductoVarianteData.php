<?php

namespace App\Data\Producto;

use Spatie\LaravelData\Data;
use Spatie\LaravelData\Mappers\SnakeCaseMapper;
use Spatie\LaravelData\Contracts\PropertyMorphableData;
use App\Enums\ProductoTipoEnum;
use App\Data\Disco\StoreDiscoData;
use App\Data\Ram\StoreRamData;
use App\Data\Computadora\StoreComputadoraData;
use App\Data\Licencia\StoreLicenciaData;
use App\Data\Camara\StoreCamaraData;

use Spatie\LaravelData\Attributes\{
    MapInputName,
    MapOutputName,
    PropertyForMorph,
    WithCast
};

#[MapInputName(SnakeCaseMapper::class)]
#[MapOutputName(SnakeCaseMapper::class)]
abstract class ProductoVarianteData extends Data implements PropertyMorphableData
{
    public function __construct(
        public int $marcaId,
        public string $modelo,

        #[PropertyForMorph]
        public ?int $tipoId = null,
    ) {}

    public function toProductoIdentidad(): ProductoIdentidadData
    {
        return ProductoIdentidadData::from([
            'marca_id'  => $this->marcaId,
            'modelo'    => $this->modelo,
        ]);
    }

    public function toProductoData(): ProductoData
    {
        return ProductoData::from([
            'tipo_id'   => $this->tipoId,
            'marca_id'  => $this->marcaId,
            'modelo'    => $this->modelo
        ]);
    }

    public static function morph(array $properties): ?string
    {
        return match (ProductoTipoEnum::tryFrom((int) ($properties['tipoId']))) {
            ProductoTipoEnum::Disco         => StoreDiscoData::class,
            ProductoTipoEnum::Ram           => StoreRamData::class,
            ProductoTipoEnum::Computadora   => StoreComputadoraData::class,
            ProductoTipoEnum::Licencia      => StoreLicenciaData::class,
            ProductoTipoEnum::Camara        => StoreCamaraData::class,
            default                         => ProductoGenericoData::class,
        };
    }
}
