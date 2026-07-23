<?php

namespace App\Http\Requests\Proveedor;

use Illuminate\Foundation\Http\FormRequest;

class StoreProveedorRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'nombre' => ['required', 'string', 'max:64', 'unique:proveedores,nombre']
        ];
    }
}
