<?php

namespace App\Http\Requests\Documento;

use Illuminate\Foundation\Http\FormRequest;

class StoreDocumentoRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'archivo' => ['required', 'file', 'max:5000', 'mimetypes:application/pdf', 'extensions:pdf'],
            'tipo_id' => ['required', 'integer', 'exists:documento_tipos,id']
        ];
    }
}
