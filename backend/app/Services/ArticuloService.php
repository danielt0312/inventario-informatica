<?php

namespace App\Services;

use Illuminate\Support\Facades\DB;
use App\Data\Articulo\StoreArticuloData;
use App\Models\{
    Articulo,
    ProductoVariante
};
use App\Enums\{
    ProductoTipoEnum,
    ClasificadorEnum,
    ArticuloEstadoEnum,
};

class ArticuloService
{
    public function crear(StoreArticuloData $data): Articulo
    {
        $productoVariante = ProductoVariante::find($data->productoVarianteId);
        $clasificador = ProductoTipoEnum::tryFrom($productoVariante->producto->tipo->id)?->clasificador();

        if ($clasificador === null) {
            $this->numeroInventarioGenerationFailure();
        }

        return DB::transaction(function () use ($data, $clasificador) {
            $articulo = Articulo::create([
                ...$data->all(),
                'estado_id' => ArticuloEstadoEnum::Activo->value
            ]);

            $articulo->numero_inventario = $this->generateNumeroInventario($clasificador, $articulo->id);
            $articulo->es_inventariable = $this->esInventariable($articulo->cuenta_contable);
            $articulo->saveQuietly();

            return $articulo;
        });
    }

    public function esInventariable(string $cuentaContable): bool
    {
        return CuentaContableService::esInventariable($cuentaContable);
    }

    public function generateNumeroInventario(ClasificadorEnum $clasificador, int $articuloId): string
    {
        return NumeroInventarioService::generate($clasificador, $articuloId);
    }

    protected function numeroInventarioGenerationFailure(): void
    {
        throw new \Exception("El número de inventario no pudo generarse correctamente.");
    }
}
