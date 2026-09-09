<?php

namespace App\Http\Requests\Producto;

use Illuminate\Foundation\Http\FormRequest;

class StoreProductoRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'tipo_id' => ['required', 'integer', 'exists:producto_tipos,id'],
            'marca_id' => ['required', 'integer', 'exists:producto_marcas,id'],
            'modelo' => ['required', 'string', 'max:128', 'unique:productos,modelo'],
        ];
    }
}
