<?php

namespace App\Http\Requests\Archivo;

use Illuminate\Foundation\Http\FormRequest;

class StoreArchivoRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'archivo' => ['required', 'file', 'max:5120', 'mimes:pdf'],
        ];
    }
}
