<?php

namespace App\Http\Requests\Dictamen;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

use App\Traits\Http\Requests\InteractsWithArchivo;
use App\Http\Requests\Dictamen\Traits\{InteractsWithDictamen, InteractsWithArticulos};

class UpdateDictamenRequest extends FormRequest
{
    use InteractsWithDictamen, InteractsWithArchivo, InteractsWithArticulos;

    public function authorize(): bool
    {
        return $this->dictamen->esEstadoSurtir();
    }

    public function rules(): array
    {
        return [
            'adscripcion_id' => [
                'required',
                'integer'
            ],
            'folio' => [
                'required',
                'string',
                'max:64',
                Rule::unique('oficios', 'folio')
                    ->ignore($this->dictamen->versionActual->oficio_id)
            ],
            'fecha_solicitud' => [
                'required',
                'date',
                'before_or_equal:today'
            ],
            'archivo_uuid' => $this->archivoRules(),
            'adquisiciones' => [
                'required',
                'array',
                'min:1'
            ],
            'adquisiciones.*.cantidad' => [
                'required',
                'integer',
                'gte:1',
                'lte:255'
            ],
            'adquisiciones.*.empleado_id' => [
                'required',
                'integer'
            ],
            'adquisiciones.*.producto_id' => [
                'required',
                'integer',
                'exists:productos,id'
            ],
            'adquisiciones.*.numero_inventario' => $this->numeroInventarioRules()
        ];
    }
}
