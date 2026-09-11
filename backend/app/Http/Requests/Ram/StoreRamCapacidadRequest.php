<?php

namespace App\Http\Requests\Ram;

use Illuminate\Foundation\Http\FormRequest;

class StoreRamCapacidadRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'nombre' => ['required', 'string', 'max:64', 'unique:ram_capacidades,nombre']
        ];
    }
}
