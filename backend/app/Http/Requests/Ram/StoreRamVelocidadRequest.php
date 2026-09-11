<?php

namespace App\Http\Requests\Ram;

use Illuminate\Foundation\Http\FormRequest;

class StoreRamVelocidadRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'nombre' => ['required', 'string', 'max:64', 'unique:ram_velocidades,nombre']
        ];
    }
}
