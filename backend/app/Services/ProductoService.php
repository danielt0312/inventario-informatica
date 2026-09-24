<?php

namespace App\Services;

use LogicException;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Model;
use App\Enums\ProductoTipoEnum;

use App\Data\Producto\{
    ProductoData,
    ProductoIdentidadData
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
            throw new LogicException("El tipo {$data->tipoId} requiere una variante; use `crearConVariante()`.");
        }

        return DB::transaction(function () use ($data) {
            $producto = Producto::firstOrCreate($data->all(), $data->all());

            return $producto->variantes()->create();
        });
    }

    public function crearConVariante(ProductoIdentidadData $identidad, Model $spec): ProductoVariante
    {
        $tipo = ProductoTipoEnum::fromVarianteModel($spec);
        $data = ProductoData::from([...$identidad->all(), 'tipoId' => $tipo->value]);

        return DB::transaction(function () use ($data, $spec) {
            $producto = Producto::firstOrCreate($data->all(), $data->all());

            $variante = $producto->variantes()->make();
            $variante->variante()->associate($spec);
            $variante->save();

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
