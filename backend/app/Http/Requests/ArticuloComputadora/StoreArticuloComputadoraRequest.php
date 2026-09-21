<?php

namespace App\Http\Requests\ArticuloComputadora;

use Illuminate\Foundation\Http\FormRequest;

class StoreArticuloComputadoraRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'discos' => [
                'required',
                'array',
                'min:1',
                'max:2'
            ],
            'discos.*.tipo_id' => [
                'required',
                'integer',
                'exists:disco_tipos,id'
            ],
            'discos.*.capacidad_id' => [
                'required',
                'integer',
                'exists:disco_capacidades,id'
            ],
            'discos.*.interfaz_id' => [
                'sometimes',
                'nullable',
                'integer',
                'exists:disco_interfaces,id'
            ],
            'discos.*.factor_forma_id' => [
                'sometimes',
                'nullable',
                'integer',
                'exists:disco_factor_formas,id'
            ],
        ];
    }
}
