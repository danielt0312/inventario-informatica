<?php

namespace App\Http\Requests\ProductoTipo;

use Illuminate\Foundation\Http\FormRequest;

class ProductoTipoRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'categorias' => ['nullable', 'array'],
            'categorias.*' => ['integer', 'exists:producto_categorias,id'],
        ];
    }
}
