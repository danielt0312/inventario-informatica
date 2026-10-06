<?php

namespace App\Services;

use LogicException;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Model;
use App\Enums\ProductoTipoEnum;

use App\Data\Producto\{
    ProductoData,
    ProductoIdentidadData,
};

use App\Models\{
    Producto,
    ProductoVariante
};

class ProductoService
{
    public function crearGenerico(ProductoData $data): ProductoVariante
    {
        if ($this->tieneVariante($data->tipoId)) {
            throw new LogicException('El tipo `'.ProductoTipoEnum::tryFrom($data->tipoId)->getLabelValue().'` requiere una variante; use `crearConVariante()`.');
        }

        return DB::transaction(function () use ($data) {
            $producto = Producto::firstOrCreate($data->all());

            return $producto->variantes()->firstOrCreate([
                'variante_type' => null,
                'variante_id'   => null,
            ]);
        });
    }

    public function crearConVariante(ProductoIdentidadData $identidad, Model $spec): ProductoVariante
    {
        $tipo = ProductoTipoEnum::tryFromVarianteModel($spec);

        if ($tipo === null) {
            throw new LogicException('El modelo `'.$model::class.'` no corresponde a ningun tipo de producto con variante.');
        }

        $data = ProductoData::from([...$identidad->all(), 'tipo_id' => $tipo->value]);

        return DB::transaction(function () use ($data, $spec, $tipo) {
            $producto = Producto::firstOrCreate($data->all());

            $variante = $producto->variantes()->firstOrCreate([
                'variante_type' => $tipo->varianteMorphAlias(),
                'variante_id'   => $spec->getKey(),
            ]);

            return $variante;
        });
    }

    protected function varianteModelClass(int $tipoId): ?string
    {
        return ProductoTipoEnum::tryFrom($tipoId)?->varianteModelClass();
    }

    public function tieneVariante(int $tipoId): bool
    {
        return $this->varianteModelClass($tipoId) !== null;
    }
}
