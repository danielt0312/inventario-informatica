<?php

namespace App\Http\Requests\Empleado;

use Illuminate\Foundation\Http\FormRequest;

class EmpleadoRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'adscripciones' => ['nullable', 'array'],
            'adscripciones.*' => ['integer']
        ];
    }
}
