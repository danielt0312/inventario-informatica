<?php

namespace App\Http\Requests\Dictamen;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

use App\Http\Requests\Dictamen\Traits\InteractsWithDictamen;
use App\Models\Archivo;

class EvidenciarAcuseDictamenRequest extends FormRequest
{
    use InteractsWithDictamen;

    protected Archivo $dictamenArchivo;
    protected Archivo $oficioArchivo;

    public function authorize(): bool
    {
        return $this->dictamen->esEstadoPendienteAcuse();
    }

    public function rules(): array
    {
        return [
            'dictamen_archivo_uuid' => [
                'bail',
                'required',
                'uuid',
                function (string $attribute, string $value, \Closure $fail) {
                    $archivo = Archivo::firstWhere('uuid', $value);
                    if (! $archivo) return $fail('validation.exists')->translate();
                    $this->dictamenArchivo = $archivo;
                },
            ],
            'oficio_archivo_uuid' => [
                Rule::excludeIf(fn () => $this->dictamen->oficio->verified_at !== null),
                'bail',
                'required',
                'uuid',
                function (string $attribute, string $value, \Closure $fail) {
                    $archivo = Archivo::firstWhere('uuid', $value);
                    if (! $archivo) return $fail('validation.exists')->translate();
                    $this->oficioArchivo = $archivo;
                },
            ],
        ];
    }

    public function getDictamenArchivo(): ?Archivo
    {
        return $this->dictamenArchivo;
    }

    public function getOficioArchivo(): ?Archivo
    {
        return $this->oficioArchivo;
    }
}
