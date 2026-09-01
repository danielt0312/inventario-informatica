<?php

namespace App\Http\Requests\Dictamen;

use Illuminate\Foundation\Http\FormRequest;
use App\Traits\Http\Requests\InteractsWithArchivo;
use App\Http\Requests\Dictamen\Traits\InteractsWithDictamen;

class EvidenciarAcuseDictamenRequest extends FormRequest
{
    use InteractsWithDictamen, InteractsWithArchivo;

    public function authorize(): bool
    {
        return $this->dictamen->esEstadoPendienteAcuse();
    }

    public function rules(): array
    {
        return [
            'archivo_uuid' => $this->archivoRules(),
        ];
    }
}
