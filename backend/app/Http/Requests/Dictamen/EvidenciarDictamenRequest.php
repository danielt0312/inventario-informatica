<?php

namespace App\Http\Requests\Dictamen;

class EvidenciarDictamenRequest extends ActionDictamenRequest
{
    public function authorize(): bool
    {
        return $this->dictamen->esEstadoEvidenciar();
    }

    public function rules(): array
    {
        return [
            'archivo' => ['required', 'file', 'max:5120', 'mimes:pdf'],
        ];
    }
}
