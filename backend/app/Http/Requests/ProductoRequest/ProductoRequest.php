<?php

namespace App\Http\Requests\ProductoRequest;

use Illuminate\Foundation\Http\FormRequest;

class ProductoRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'tipos' => ['nullable', 'array'],
            'tipos.*' => ['integer', 'exists:producto_tipos,id'],
            'marcas' => ['nullable', 'array'],
            'marcas.*' => ['integer', 'exists:producto_marcas,id'],
        ];
    }
}
