<?php

namespace App\Http\Requests\Dictamen\Traits;

use Illuminate\Validation\Validator;

use App\Models\Articulo;
use App\Enums\ProductoTipoEnum;
use App\Services\DictamenService;

trait InteractsWithArticulos
{
    protected array $articulosNumeroInventario;

    public function __construct(
        protected DictamenService $dictamenService
    ) {
        parent::__construct();
    }

    protected function validateNumeroInventario(
        Validator $validator,
        array $articulo,
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

        if (!NumeroInventarioService::matches($numeroInventario)) {
            $validator->addFailure($keyField, 'regex');
            return;
        }

        foreach ($articulos as $articulo) {
            if ($articulo->numero_inventario === $numeroInventario) {
                $this->setArticuloNumeroInventario($numeroInventario, $articulo);
                return;
            }
        }

        $validator->addFailure($keyField, 'exists');
    }

    protected function setArticuloNumeroInventario(string $numeroInventario, Articulo $articulo): void
    {
        $this->articulosNumeroInventario[$numeroInventario] = $articulo;
    }

    public function getArticuloNumeroInventario(string $numeroInventario): Articulo | null
    {
        return $this->articulosNumeroInventario[$numeroInventario];
    }
}
