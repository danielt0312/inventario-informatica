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
use App\Http\Requests\Dictamen\Traits\{InteractsWithDictamen, InteractsWithArticulos};

class InventariarDictamenRequest extends FormRequest
{
    use InteractsWithDictamen {
        prepareForValidation as protected traitPrepareForValidation;
    }

    use InteractsWithArticulos;

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

    protected function prepareForValidation(): void
    {
        $this->traitPrepareForValidation();

        if ($this->dictamen->orden_compra_id !== null) {
            $this->merge(['orden_compra_id' => $this->dictamen->orden_compra_id]);
            $this->setOrdenCompra($this->dictamen->ordenCompra);
        }
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
            'adquisiciones.*.numero_inventario' => $this->numeroInventarioRules(),
            'adquisiciones.*.cuenta_contable' => [
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
                $validatorErrors = $validator->errors();

                if ($validatorErrors->isNotEmpty()) return;

                $adquisicionesPayload = collection($this->input('adquisiciones', []));

                $adquisiciones = DictamenAdquisicion::with('producto:id,tipo_id')
                    ->withCount('articulos')
                    ->whereIn('id', $adquisicionesPayload->pluck('id')->unique())
                    ->get()
                    ->keyBy('id');

                $productos = Producto::select('id', 'tipo_id')
                    ->whereIn('id', $adquisicionesPayload->pluck('producto_id')->filter())
                    ->get()
                    ->keyBy('id');

                foreach ($adquisicionesPayload as $index => $adquisicionPayload) {
                    if ($adquisicionPayload['es_resultado_esperado']) continue;

                    $adquisicion = $adquisiciones->get($adquisicionPayload['id']);
                    $producto = $productos->get($adquisicionPayload['producto_id'] ?? null);

                    if (!$adquisicion || !$productoEnviado) continue;

                    if ($enviado->tipo_id !== $adquisicion->producto->tipo->id) {
                        $validatorErrors->add("adquisiciones.$index.producto_id", 'El producto debe serl del mismo tipo que el solicitado');
                    }

                    $pendiente = $adquisicion->cantidad - $adquisicion->articulos_count;
                    if ($adquisicion->count() > $pendiente) {
                        $validatorErrors->add("adquisiciones.$index.id", "Este bien informático excede lo pendiente a surtir ({$pendiente})");
                    }
                }

                foreach ($adquisicionesPayload as $index => [
                    'id' => $id,
                    'factura_id' => $facturaId,
                    'cuenta_contable' => $cuentaContable,
                ]) {
                    foreach ($this->getFacturas() as $factura) {
                        if ($factura->id === $facturaId) {
                            $this->setFacturaAdquisiciones($cuentaContable, $factura);
                            continue;
                        }
                    }

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

                        $validatorErrors->add("adquisiciones.$index.factura_id", 'La factura proporcionada no pertenece al mismo proveedor que la orden de compra indicada');
                        continue;
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
