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
            'proveedor_id' => [
                'required',
                'integer',
                'exists:proveedores,id'
            ],
            'fecha_emision' => [
                'required',
                'date',
                'before_or_equal:today'
            ],
            'archivo_uuid' => $this->archivoRules(),
        ];
    }
}
