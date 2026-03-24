<?php

namespace App\Http\Requests\ProductoMarca;

use Illuminate\Foundation\Http\FormRequest;

class ProductoMarcaRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'producto_tipo_id' => ['sometimes', 'integer', 'exists:producto_tipos,id']
        ];
    }
}
