<?php

namespace App\Http\Requests\Dictamen\Traits;

use Illuminate\Validation\{NestedRules, Rule};

use App\Models\Articulo;
use App\Services\DictamenService;
use App\Rules\NumeroInventarioRule;
use App\Enums\ProductoTipoEnum;

trait InteractsWithArticulos
{
    protected array $articulos;

    public function __construct(
        protected DictamenService $dictamenService
    ) {
        parent::__construct();
    }

    protected function numeroInventarioRules(): NestedRules
    {
        return Rule::foreach(function ($_, string $attribute) {
            $index = explode('.', $attribute)[1];
            $tipo = $this->input("adquisiciones.{$index}.producto_tipo_id");
            $tipoEnum = ProductoTipoEnum::tryFrom($tipo);

            return [
                Rule::excludeIf(fn () =>
                    $tipoEnum === null || !$this->dictamenService->productoRequiereNumeroInventario($tipoEnum)
                ),
                'required',
                new NumeroInventarioRule,
                function (string $attribute, string $value, \Closure $fail) {
                    $articulo = Articulo::firstWhere('numero_inventario', $value);
                    if (empty($articulo)) return $fail('Número de inventario inexistente');
                    $this->setArticulos($value, $articulo);
                }
            ];
        });
    }

    public function validated($key = null, $default = null): array
    {
        return [
            ...parent::validated(),
            ...$this->getValidatorInstance()->getData()
        ];
    }


    protected function passedValidation(): void
    {
        $this->normalizeAdquisicionesData();
    }

    protected function normalizeAdquisicionData(array $adquisicion): array
    {
        return !empty($adquisicion['numero_inventario'] ?? null)
            ? [
                ...$adquisicion,
                'articulo_id' => $this->getArticulos($adquisicion['numero_inventario'])->id,
            ]
            : $adquisicion;
    }

    protected function normalizeAdquisicionesData(): void
    {
        $validator = $this->getValidatorInstance();
        $data = $validator->getData();

        $validator->setData([
            ...$data,
            ...['adquisiciones' => array_map($this->normalizeAdquisicionData(...), $data['adquisiciones'])]
        ]);
    }

    private function setArticulos(string $key, Articulo $value): void
    {
        $this->articulos[$key] = $value;
    }

    protected function getArticulos(?string $key = null): Articulo | array | null
    {
        return $key !== null
            ? $this->articulos[$key]
            : $this->articulos;
    }
}
