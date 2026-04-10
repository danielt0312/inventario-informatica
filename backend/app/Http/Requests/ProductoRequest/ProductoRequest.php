<?php

namespace App\Http\Requests\ProductoRequest;

use Illuminate\Foundation\Http\FormRequest;

class ProductoRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'tipo_id' => ['sometimes', 'integer', 'exists:producto_tipos,id'],
            'marca_id' => ['sometimes', 'integer', 'exists:producto_marcas,id'],
        ];
    }
}
