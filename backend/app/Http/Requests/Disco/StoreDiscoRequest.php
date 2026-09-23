<?php

namespace App\Http\Requests\Disco;

use Illuminate\Foundation\Http\FormRequest;
use App\Traits\Http\Requests\ValidatesProductoAttributes;

class StoreDiscoRequest extends FormRequest
{
    use ValidatesProductoAttributes;

    public function rules(): array
    {
        return [
            ...$this->productoRules(),
            'disco' => [
                'required',
                'array',
            ],
            'disco.tipo_id' => [
                'required',
                'integer',
                'exists:disco_tipos,id'
            ],
            'disco.capacidad_id' => [
                'required',
                'integer',
                'exists:disco_capacidades,id'
            ],
            'disco.interfaz_id' => [
                'sometimes',
                'nullable',
                'integer',
                'exists:disco_interfaces,id'
            ],
            'disco.factor_forma_id' => [
                'sometimes',
                'nullable',
                'integer',
                'exists:disco_factor_formas,id'
            ]
        ];
    }
}
