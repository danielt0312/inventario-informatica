<?php

namespace App\Http\Requests\Resguardo;

use Illuminate\Foundation\Http\FormRequest;

class UpdateEmpleadoResguardoRequest extends FormRequest
{
    // TODO validar en caso de que el empleado no exista
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'articulos' => [
                'required',
                'array',
                'min:1'
            ],

            // TODO validar que su estado sea apto y que no se trate de un producto tipo ram|discos|...
            'articulos.*' => [
                'bail',
                'required',
                'uuid',
                'exists:articulos,uuid'
            ],
        ];
    }
}
