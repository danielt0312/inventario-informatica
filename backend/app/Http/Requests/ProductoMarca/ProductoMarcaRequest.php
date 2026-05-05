<?php

namespace App\Http\Requests\ProductoMarca;

use Illuminate\Foundation\Http\FormRequest;

class ProductoMarcaRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'tipos' => ['nullable', 'array'],
            'tipos.*' => ['integer', 'exists:producto_tipos,id']
        ];
    }
}
