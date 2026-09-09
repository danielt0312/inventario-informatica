<?php

namespace App\Http\Requests\Resguardo;

use Illuminate\Foundation\Http\FormRequest;
use App\Enums\ResguardoEstadoEnum;
use App\Traits\Http\Requests\InteractsWithArchivo;

class EvidenciarAcuseResguardoRequest extends FormRequest
{
    use InteractsWithArchivo;

    public function rules(): array
    {
        return [
            'acuse_archivo_uuid' => $this->archivoRules(),
        ];
    }
}
