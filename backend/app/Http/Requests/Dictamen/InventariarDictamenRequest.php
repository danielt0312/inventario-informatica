<?php

namespace App\Http\Requests\Dictamen;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Validator;

use App\Models\{
    OrdenCompra,
    Factura,
};
use App\Http\Requests\Dictamen\Traits\{InteractsWithDictamen, InteractsWithArticulos};

class InventariarDictamenRequest extends FormRequest
{
    use InteractsWithDictamen, InteractsWithArticulos;

    private OrdenCompra $ordenCompra;
    private array $facturas;

    public function authorize(): bool
    {
        return $this->dictamen->esEstadoInventariar();
    }

    public function rules(): array
    {
        return [
            'orden_compra_id' => [
                'required',
                'integer',
                function (string $attribute, string $value, \Closure $fail) {
                    $ordenCompra = OrdenCompra::find($value);
                    if (empty($ordenCompra)) return $fail('validation.exists');
                    $this->setOrdenCompra($ordenCompra);
                }
            ],
            'adquisiciones' => [
                'required',
                'array'
            ],
            'adquisiciones.*.es_resultado_esperado' => [
                'required',
                'boolean'
            ],
            'adquisiciones.*.observaciones' => [
                'exclude_unless:adquisiciones.*.es_resultado_esperado,false',
                'required',
                'string',
                'max:255'
            ],
            'adquisiciones.*.producto_id' => [
                'required',
                'integer',
                'exists:productos,id'
            ],
            'adquisiciones.*.numero_inventario' => $this->numeroInventarioRules(),
            'adquisiciones.*.cuenta_contable' => [
                'bail',
                'required',
                'string',
                'size:11',
                'distinct',
                'unique:articulos,cuenta_contable'
            ],
            'adquisiciones.*.numero_serie' => [
                'nullable',
                'string',
                'max:64',
                'distinct',
                'unique:articulos,numero_serie'
            ],
            'adquisiciones.*.es_contable' => [
                'required',
                'boolean',
            ],
            'adquisiciones.*.costo_unitario' => [
                'exclude_unless:adquisiciones.*.es_contable,true',
                'required',
                'numeric',
            ],
            'adquisiciones.*.factura_id' => [
                'required',
                'integer',
                'exists:facturas,id'
            ]
        ];
    }

    public function withValidator(Validator $validator): void
    {
        $validator->after(function (Validator $validator) {
            $errors = $validator->errors();

            if ($errors->has('orden_compra_id')) return;

            foreach ($this->input('adquisiciones', []) as $index => $adquisiciones) {
                if ($errors->has("adquisiciones.$index.factura_id") ||  $errors->has("adquisiciones.$index.cuenta_contable")) return;

                $factura = Factura::query()
                    ->join('factura_orden_compra', 'factura_orden_compra.factura_id', '=', 'facturas.id')
                    ->join('orden_compras', 'orden_compras.id', '=', 'factura_orden_compra.orden_compra_id')
                    ->where('facturas.id', $adquisiciones['factura_id'])
                    ->where('orden_compras.id', $this->orden_compra_id)
                    ->select('facturas.*')
                    ->first();

                if (! $factura) {
                   return $errors->add("adquisiciones.$index.factura_id", 'Debes de proporcionar una factura relacionada con la orden de compra seleccionada');
                }

                $this->setFacturas($adquisiciones['cuenta_contable'], $factura);
            }
        });
    }

    protected function setOrdenCompra(OrdenCompra $ordenCompra): void
    {
        $this->ordenCompra = $ordenCompra;
    }

    public function getOrdenCompra(): OrdenCompra
    {
        return $this->ordenCompra;
    }

    protected function setFacturas(string $key, Factura $factura): void
    {
        $this->facturas[$key] = $factura;
    }

    public function getFacturas(null|string $key = null): array | Factura | null
    {
        return $key !== null
            ? $this->facturas[$key]
            : $this->facturas;
    }
}
