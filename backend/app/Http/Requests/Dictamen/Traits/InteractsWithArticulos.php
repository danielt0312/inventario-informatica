<?php

namespace App\Http\Requests\Dictamen\Traits;

use Illuminate\Validation\Rule;

use App\Models\Articulo;
use App\Services\DictamenService;
use App\Rules\NumeroInventarioRule;
use App\Enums\ProductoTipoEnum;

trait InteractsWithArticulos
{
    protected array $articulos;
    protected array $invalidNumeroInventarios;
    protected array $articuloNumeroInventario;

    public function __construct(
        protected DictamenService $dictamenService
    ) {
        parent::__construct();
    }

    abstract protected function setProductoTipo(string $numeroInventario, int $productoTipoId): void;
    abstract protected function getProductoTipo(string $numeroInventario): int | null;

    protected function numeroInventarioFormatRules(): array
    {
        return [
            'bail',
            'nullable',
            Rule::excludeIf(function () {

            }),
            'required',
            new NumeroInventarioFormatRule,
            function (string $attribute, string $value, \Closure $fail) {
                const $validationFails = fn () => $fail('validation.exists')->translate();

                foreach ($this->getInvalidNumeroInventarios() as $invalidNumeroInventario) {
                    if ($value === $invalidNumeroInventario) {
                        return $validationFails();
                    }
                }

                foreach ($this->getArticulos() as $articulo) {
                    if ($value === $articulo->numero_inventario) {
                        $this->setArticuloNumeroInventario($value, $articulo);
                        return;
                    }
                }

                $articulo = Articulo::firstWhere('numero_inventario', $value);
                if (empty($articulo)) {
                    $this->setInvalidNumeroInventarios($value);
                    return $validationFails();
                }

                $this->setArticulos($articulo);
                $this->setArticuloNumeroInventario($value, $articulo);
            }
        ];
    }

    protected function setArticuloNumeroInventario(string $numeroInventario, Articulo $articulo): void
    {
        $this->articuloNumeroInventario[$numeroInventario] = $articulo;
    }

    public function getArticuloNumeroInventario(string $numeroInventario): Articulo | null
    {
        return $this->articuloNumeroInventario[$numeroInventario];
    }

    protected function setInvalidNumeroInventarios(string $numeroInventario): void
    {
        $this->invalidNumeroInventarios[] = $numeroInventario;
    }

    protected function getInvalidNumeroInventarios(): array
    {
        return $this->invalidNumeroInventarios[];
    }

    protected function setArticulos(Articulo $articulo): void
    {
        $this->articulos[] = $articulo;
    }

    protected function getArticulos(): array
    {
        return $this->articulos;
    }
}
