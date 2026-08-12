<?php

namespace App\Http\Requests\Factura;

use Illuminate\Foundation\Http\FormRequest;

use App\Traits\Http\Requests\InteractsWithArchivo;
use App\Models\OrdenCompra;

class StoreFacturaRequest extends FormRequest
{
    use InteractsWithArchivo;

    public function rules(): array
    {
        return [
            'folio' => [
                'required',
                'string',
                'max:64',
                'unique:facturas,folio'
            ],
            'orden_compra_id' => [
                'required',
                'integer',
                function (string $attribute, string $value) {
                    $ordenCompra = OrdenCompra::find($value);
                    if (! $ordenCompra) return $fail('validation.exists');
                    $this->setOrdenCompra($ordenCompra);
                }
            ],
            'fecha_emision' => [
                'required',
                'date',
                'before_or_equal:today'
            ],
            'archivo_uuid' => $this->archivoRules(),
        ];
    }

    protected function setOrdenCompra(OrdenCompra $ordenCompra)
    {
        $this->ordenCompra = $ordenCompra;
    }

    public function getOrdenCompra(): OrdenCompra
    {
        return $this->ordenCompra;
    }
}
