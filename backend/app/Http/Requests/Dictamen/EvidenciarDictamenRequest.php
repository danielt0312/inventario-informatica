<?php

namespace App\Http\Requests\Dictamen;

use App\Enums\DictamenEstadoEnum;

class EvidenciarDictamenRequest extends ActionDictamenRequest
{
    public function authorize(): bool
    {
        return $this->dictamen->esEstado(DictamenEstadoEnum::EVIDENCIAR);
    }

    public function rules(): array
    {
        return [
            'archivo' => ['required', 'file', 'max:5120', 'mimes:pdf'],
        ];
    }
}
