<?php

namespace App\Http\Requests\OrdenCompra;

use Illuminate\Foundation\Http\FormRequest;
use App\Traits\Http\Requests\InteractsWithArchivo;

class StoreOrdenCompraRequest extends FormRequest
{
    use InteractsWithArchivo;

    public function rules(): array
    {
        return [
            'fecha_solicitud' => ['required', 'date', 'before_or_equal:today'],
            'numero_orden' => ['required', 'string', 'max:64', 'unique:orden_compras,numero_orden'],
            'proveedor_id' => ['required', 'integer', 'exists:proveedores,id'],
            'archivo_uuid' => $this->archivoRule(),
        ];
    }
}
