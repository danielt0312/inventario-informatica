<?php

namespace App\Http\Requests\Articulo;

use Illuminate\Foundation\Http\FormRequest;

class ArticuloRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'categorias' => ['nullable', 'array'],
            'categorias.*' => ['integer', 'exists:producto_categorias,id'],
            'tipos' => ['nullable', 'array'],
            'tipos.*' => ['integer', 'exists:producto_tipos,id'],
            'marcas' => ['nullable', 'array'],
            'marcas.*' => ['integer', 'exists:producto_marcas,id'],
            'productos' => ['nullable', 'array'],
            'productos.*' => ['integer', 'exists:productos,id'],
            'estados' => ['nullable', 'array'],
            'estados.*' => ['integer', 'exists:articulo_estados,id'],
            'numero_inventario' => ['nullable', 'string'],
        ];
    }
}
