<?php

namespace App\Http\Requests\Documento;

use Illuminate\Foundation\Http\FormRequest;

class DocumentoRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'archivo_nombre' => ['nullable', 'string', 'max:64'],
            'tipos' => ['nullable', 'array'],
            'tipos.*' => ['integer', 'exists:documento_tipos,id']
        ];
    }
}
