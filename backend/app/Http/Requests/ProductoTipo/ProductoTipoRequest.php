<?php

namespace App\Http\Requests\ProductoTipo;

use Illuminate\Foundation\Http\FormRequest;

class ProductoTipoRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'producto_categoria_id' => ['required', 'integer', 'exists:producto_categorias,id'],
        ];
    }
}
