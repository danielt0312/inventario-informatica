<?php

namespace App\Http\Requests\ProductoTipo;

use Illuminate\Foundation\Http\FormRequest;

class StoreProductoTipoRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'categoria_id' => ['required', 'integer', 'exists:producto_categorias,id'],
            'nombre' => ['required', 'string', 'max:64']
        ];
    }
}
