<?php

namespace App\Http\Requests\Dictamen\Traits;

use Illuminate\Validation\Validator;
use Illuminate\Database\Eloquent\Collection;

use App\Models\Articulo;
use App\Enums\ProductoTipoEnum;
use App\Services\{
    DictamenService
};

trait InteractsWithArticulos
{
    protected array $articulosNumeroInventario = [];

    public function __construct(
        protected DictamenService $dictamenService
    ) {
        parent::__construct();
    }

    public function getAdquisicionesValidatedData() {
        $adquisiciones = $this->validated('adquisiciones', []);

        return array_map(function ($adquisicion) {
                if (
                    !empty($numeroInventario = $adquisicion['numero_inventario'] ?? null) &&
                    array_key_exists($numeroInventario, $this->articulosNumeroInventario)
                ) return [
                    ...$adquisicion,
                    'articulo_id' => $this->articulosNumeroInventario[$numeroInventario]->id
                ];
                return $adquisicion;
            }, $adquisiciones);
    }

    protected function validateNumeroInventario(
        Validator $validator,
        Collection $articulos,
        int|null $productoTipoId,
        string|null $numeroInventario,
        string $keyField,
    ) {
        if ($productoTipoId === null || empty($articulos)) return;
        $productoTipoEnum = ProductoTipoEnum::tryFrom($productoTipoId);

        if (
            $productoTipoEnum === null ||
            !$this->dictamenService->productoTipoPuedeRequerirNumeroInventario($productoTipoEnum) ||
            empty($numeroInventario)
        ) return;

        foreach ($articulos as $articulo) {
            if ($articulo->numero_inventario === $numeroInventario) {
                $this->articulosNumeroInventario[$numeroInventario] = $articulo;
                return;
            }
        }

        $validator->addFailure($keyField, 'exists');
    }
}
