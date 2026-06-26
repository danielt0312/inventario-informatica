<?php

namespace App\Http\Requests\ProductoCategoria;

use Illuminate\Foundation\Http\FormRequest;

class StoreProductoCategoriaRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'nombre' => ['required', 'string', 'max:64', 'unique:producto_categorias,nombre']
        ];
    }
}
