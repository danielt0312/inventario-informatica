<?php

namespace App\Http\Requests\Dictamen;

use App\Traits\Http\Requests\InteractsWithArchivo;

class EvidenciarDictamenRequest extends ActionDictamenRequest
{
    use InteractsWithArchivo;

    public function authorize(): bool
    {
        return $this->dictamen->esEstadoEvidenciar();
    }

    public function rules(): array
    {
        return [
            'archivo_uuid' => $this->archivoRule(),
        ];
    }
}
