<?php

namespace App\Services;

use LogicException;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Model;

use App\Data\Producto\ProductoData;

use App\Models\{
    Producto,
    ProductoVariante
};

class ProductoService
{
    public function createWithVariante(ProductoData $data, ?Model $spec = null): ProductoVariante
    {
        $expected = $this->varianteModelClass($data->tipoId);

        if ($expected !== null && ! $spec instanceof $expected) {
            throw new LogicException("Se esperaba una instancia de {$expected} para el tipo {$data->tipoId}");
        }

        if ($expected === null && $spec !== null) {
            throw new LogicException("El tipo {$data->tipoId} no admite variante");
        }

        return DB::transaction(function () use ($data, $spec) {
            $producto = Producto::firstOrCreate($data->all(), $data->all());

            $variante = $producto->variantes()->make();

            if ($spec !== null) {
                $variante->variante()->associate($spec);
            }

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
