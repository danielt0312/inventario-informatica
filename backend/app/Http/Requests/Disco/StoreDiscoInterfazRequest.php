<?php

namespace App\Http\Requests\Disco;

use Illuminate\Foundation\Http\FormRequest;

class StoreDiscoInterfazRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'nombre' => ['required', 'string', 'max:64', 'unique:disco_interfaces,nombre']
        ];
    }
}
