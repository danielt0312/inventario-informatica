<?php

namespace App\Http\Requests\Proveedor;

use Illuminate\Foundation\Http\FormRequest;

class StoreProveedorRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'nombre' => ['required', 'string', 'max:64'],
            'rfc' => ['required', 'string', 'min:12', 'max:13', 'unique:proveedores,rfc'],
        ];
    }
}
