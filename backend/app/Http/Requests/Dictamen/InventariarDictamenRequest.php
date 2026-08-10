<?php

namespace App\Http\Requests\Dictamen;

use Illuminate\Foundation\Http\FormRequest;

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
            'orden_compra_uuid' => [
                'bail',
                'uuid',
                function (string $attribute, string $value, \Closure $fail) {
                    $ordenCompra = OrdenCompra::findByArchivoUuid($value)
                        ->first();

                    if (empty($ordenCompra)) return $fail('Orden compra not found');

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
            'adquisiciones.*.factura_uuid' => [
                'bail',
                'required',
                'uuid',
                function (string $attribute, string $value, \Closure $fail) {
                    $factura = Factura::findByArchivoUuid($value)
                        ->first();

                    if (empty($factura)) return $fail('factura not found');

                    $this->setFactura($factura, $value);
                }
            ]
        ];
    }

    protected function setOrdenCompra(OrdenCompra $ordenCompra): void
    {
        $this->ordenCompra = $ordenCompra;
    }

    public function getOrdenCompra(): OrdenCompra
    {
        return $this->ordenCompra;
    }

    protected function setFactura(Factura $factura, string $uuid)
    {
        $this->facturas[$uuid] = $factura;
    }

    public function getFactura(string $uuid): Factura | null
    {
        return $this->facturas[$uuid];
    }
}
