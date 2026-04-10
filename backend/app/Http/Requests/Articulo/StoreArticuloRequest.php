<?php

namespace App\Http\Requests\Articulo;

use Illuminate\Foundation\Http\FormRequest;

class StoreArticuloRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'producto_id'       => ['required', 'integer', 'exists:productos,id'],
            'numero_serie'      => ['nullable', 'string', 'fillable', 'max:32', 'unique:articulo,numero_serie'],
            'costo_unitario'    => ['nullable', 'decimal:7,2'],
            'factura_id'        => ['nullable', 'integer', 'exists:facturas,id'],
            'qr_archivo_id'     => ['nullable', 'integer', 'exists:archivos,id'],
            'contable'          => ['required', 'boolean'],
        ];
    }
}
