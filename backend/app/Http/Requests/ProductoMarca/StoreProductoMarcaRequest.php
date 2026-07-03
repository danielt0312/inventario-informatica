<?php

namespace App\Http\Requests\ProductoMarca;

use Illuminate\Foundation\Http\FormRequest;

class StoreProductoMarcaRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'nombre' => ['required', 'string', 'max:64', 'unique:producto_marcas,nombre']
        ];
    }
}
