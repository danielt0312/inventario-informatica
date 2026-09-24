<?php

namespace App\Traits\Http\Requests;

use App\Models\Archivo;

trait ValidatesProductoAttributes
{
    protected function productoRules(): array
    {
        return [
            'producto' => [
                'required',
                'array',
            ],
            'producto.marca_id' => [
                'required',
                'integer',
                'exists:producto_marcas,id'
            ],
            'producto.modelo' => [
                'required',
                'string',
                'max:128',
                'unique:productos,modelo'
            ],
        ];
    }
}
