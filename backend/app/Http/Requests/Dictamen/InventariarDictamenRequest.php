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
    /**
     * Facturas únicas que fueron enviadas en el payload
     */
    private array $facturas = [];
    /**
     * Facturas únicas relacionadas a la adquisición
     */
    private array $facturaAdquisiciones = [];

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

    public function after(): array
    {
        return [
            function (Validator $validator) {
                foreach ($this->input('adquisiciones', []) as $index => [
                        'factura_id' => $facturaId,
                        'cuenta_contable' => $cuentaContable,
                    ])
                {
                    $esFacturaValida = false;
                    foreach ($this->getFacturas() as $factura) {
                        if ($factura->id === $facturaId) {
                            $esFacturaValida = true;
                            break;
                        }
                    }
                    if ($esFacturaValida) break;

                    $factura = Factura::query()
                        ->join('proveedores', 'proveedores.id', '=', 'facturas.proveedor_id')
                        ->join('orden_compras', 'orden_compras.proveedor_id', '=', 'proveedores.id')
                        ->where('facturas.id', $facturaId)
                        ->where('orden_compras.id', $this->orden_compra_id)
                        ->select('facturas.*')
                        ->first();

                    if (! $factura) {
                        logger()->warning('Factura no pertenece a Proveedor de Orden de Compra', [
                            'payload' => $validator->getData(),
                            'user_id' => auth()->id(),
                            'ip' => $this->ip(),
                        ]);

                        return $validator->errors->add("adquisiciones.$index.factura_id", 'La factura proporcionada no pertenece al mismo proveedor que la orden de compra indicada');
                    }

                    $this->setFacturas($factura);
                    $this->setFacturaAdquisiciones($cuentaContable, $factura);
                }
            }
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

    protected function setFacturas(Factura $factura): void
    {
        $this->facturas[] = $factura;
    }

    public function getFacturas(): array
    {
        return $this->facturas;
    }

    protected function setFacturaAdquisiciones(string $cuentaContable, Factura $factura): void
    {
        $this->facturaAdquisiciones[$cuentaContable] = $factura;
    }

    public function getFacturaAdquisiciones(string|null $cuentaContable = null): array | Factura | null
    {
        return $cuentaContable !== null
            ? $this->facturaAdquisiciones[$cuentaContable]
            : $this->facturaAdquisiciones;
    }
}
