<?php

namespace App\Http\Requests\Dictamen;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Validator;
use Illuminate\Validation\Rule;

use App\Models\{
    OrdenCompra,
    Factura,
    DictamenAdquisicion,
    Producto
};

use App\Http\Requests\Dictamen\Traits\{
    InteractsWithDictamen,
    InteractsWithArticulos
};

use App\Rules\CuentaContableFormat;

class InventariarDictamenRequest extends FormRequest
{
    use InteractsWithDictamen {
        prepareForValidation as protected traitPrepareForValidation;
    }

    use InteractsWithArticulos;

    private OrdenCompra $ordenCompra;
    /**
     * Facturas válidas que fueron enviadas en el payload
     */
    private array $facturas = [];
    /**
     * Facturas válidas relacionadas a la adquisición
     */
    private array $facturaAdquisiciones = [];
    /**
     * Facturas inválidas que fueron enviadas en el payload
     */
    private array $facturasIdInvalidas = [];
    /**
     * Productos válidos que fueron enviados al payload
     */
    private array $productos = [];

    public function authorize(): bool
    {
        return $this->dictamen->esEstadoInventariar();
    }

    protected function prepareForValidation(): void
    {
        $this->traitPrepareForValidation();

        if ($this->dictamen->orden_compra_id !== null) $this->setOrdenCompra($this->dictamen->ordenCompra);
    }


    public function rules(): array
    {
        return [
            'orden_compra_id' => [
                Rule::excludeIf(fn () => $this->dictamen->orden_compra_id !== null),
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
                'array',
                'min:1',
            ],
            'adquisiciones.*.id' => [
                'required',
                'integer',
                'exists:dictamen_adquisiciones,id'
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
                'exclude_unless:adquisiciones.*.es_resultado_esperado,false',
                'required',
                'integer',
                'exists:productos,id'
            ],
            'adquisiciones.*.cuenta_contable' => [
                'required',
                new CuentaContableFormat,
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
            'adquisiciones.*.costo_unitario' => [
                'nullable',
                'required_if:adquisiciones.*.es_contable,true',
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
                if ($validator->errors()->isNotEmpty()) return;

                $adquisicionesPayload = collect($this->input('adquisiciones', []));

                $adquisiciones = DictamenAdquisicion::with('producto:id,tipo_id')
                    ->withCount('articulosSurtidos')
                    ->whereIn('id', $adquisicionesPayload->pluck('id')->unique())
                    ->get()
                    ->keyBy('id');

                $productos = Producto::select('id', 'tipo_id')
                    ->whereIn('id', $adquisicionesPayload->pluck('producto_id')->filter())
                    ->get()
                    ->keyBy('id');

                $conteoPorAdquisicion = $adquisicionesPayload->countBy('id');

                $validarProducto = function ($adquisicionPayload, $index) use ($adquisiciones, $productos, $conteoPorAdquisicion, $validator) {
                    $adquisicion = $adquisiciones->get($adquisicionPayload['id']);
                    if (!$adquisicion) return;

                    if (! $adquisicionPayload['es_resultado_esperado']) {
                        $producto = $productos->get($adquisicionPayload['producto_id'] ?? null);

                        if ($producto->tipo_id !== $adquisicion->producto->tipo_id) {
                            $validator->addFailure("adquisiciones.$index.producto_id", "El adquisiciones.$index.producto_id debe ser del mismo tipo que el solicitado en el dictamen");
                        } else {
                            $this->setProductos($adquisicionPayload['cuenta_contable'], $producto);
                        }
                    } else {
                        $this->setProductos($adquisicionPayload['cuenta_contable'], $adquisicion->producto);
                    }

                    $pendiente = $adquisicion->cantidad - $adquisicion->articulos_surtidos_count;
                    $enviado = $conteoPorAdquisicion->get($adquisicionPayload['id']);

                    if ($enviado > $pendiente) {
                        $validator->addFailure("adquisiciones.$index.id", "El adquisiciones.$index.id excede lo pendiente a surtir ({$pendiente})");
                    }
                };

                $validarFactura = function ($adquisicionPayload, $index) use ($validator) {
                    foreach ($this->getFacturas() as $factura) {
                        if ($factura->id === $adquisicionPayload['factura_id']) {
                            $this->setFacturaAdquisiciones($adquisicionPayload['cuenta_contable'], $factura);
                            return;
                        }
                    }

                    $setValidatorError = fn () =>
                        $validator->addFailure("adquisiciones.$index.factura_id", "La adquisiciones.$index.factura_id no pertenece al mismo proveedor que la orden_compra indicada");

                    foreach ($this->getFacturasInvalidas() as $facturaIdInvalida) {
                        if ($facturaIdInvalida === $adquisicionPayload['factura_id']) {
                            $setValidatorError();
                            return;
                        }
                    }

                    $factura = Factura::query()
                        ->join('proveedores', 'proveedores.id', '=', 'facturas.proveedor_id')
                        ->join('orden_compras', 'orden_compras.proveedor_id', '=', 'proveedores.id')
                        ->where('facturas.id', $adquisicionPayload['factura_id'])
                        ->where('orden_compras.id', $this->orden_compra_id)
                        ->select('facturas.*')
                        ->first();

                    if (! $factura) {
                        logger()->warning('Factura no pertenece a Proveedor de Orden de Compra', [
                            'payload' => $validator->getData(),
                            'user_id' => auth()->id(),
                            'ip' => $this->ip(),
                        ]);

                        $setValidatorError();
                        $this->setFacturasIdInvalidas($adquisicionPayload['factura_id']);
                        return;
                    }

                    $this->setFacturas($factura);
                    $this->setFacturaAdquisiciones($adquisicionPayload['cuenta_contable'], $factura);
                };

                foreach ($adquisicionesPayload as $index => $adquisicionPayload) {
                    $validarProducto($adquisicionPayload, $index);
                    $validarFactura($adquisicionPayload, $index);
                }
            }
        ];
    }

    protected function setProductos(string $cuentaContable, Producto $producto): void
    {
        $this->productos[$cuentaContable] = $producto;
    }

    public function getProductos(string $cuentaContable): Producto | null
    {
        return $this->productos[$cuentaContable];
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

    public function getFacturaAdquisiciones(string $cuentaContable = null): Factura | null
    {
        return $this->facturaAdquisiciones[$cuentaContable];
    }

    private function setFacturasIdInvalidas($id): void
    {
        $this->facturasIdInvalidas[] = $id;
    }

    private function getFacturasInvalidas(): array
    {
        return $this->facturasIdInvalidas;
    }
}
