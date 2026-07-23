<?php

namespace App\Http\Requests\OrdenCompra;

use Illuminate\Foundation\Http\FormRequest;

class StoreOrdenCompraRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'fecha_solicitud' => ['required', 'date', 'before_or_equal:today'],
            'archivo' => ['required', 'file', 'max:5120', 'mimes:pdf'],
            'numero_orden' => ['required', 'string', 'max:64', 'unique:orden_compras,numero_orden'],
            'proveedor_id' => ['required', 'integer', 'exists:proveedores,id'],
        ];
    }
}
