<?php

namespace App\Http\Requests\ArchivoTemporal;

use Illuminate\Foundation\Http\FormRequest;

class StoreArchivoTemporalRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'archivo' => ['required', 'file', 'max:5120', 'mimes:pdf'],
        ];
    }
}
