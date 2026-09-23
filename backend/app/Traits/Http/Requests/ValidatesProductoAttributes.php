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
            'producto.tipo_id' => [
                'required',
                'integer',
                'exists:producto_tipos,id'
            ],
            'producto.marca_id' => [
                'required',
                'integer',
                'exists:producto_marcas,id'
            ],
            'producto.modelo' => [
                'required',
                'integer',
                'unique:productos,modelo'
            ],
        ];
    }
}
