<?php

namespace App\Http\Requests\Dictamen;

use Closure;
use Illuminate\Foundation\Http\FormRequest;

use App\Traits\Http\Requests\InteractsWithArchivo;
use App\Http\Requests\Dictamen\Traits\InteractsWithArticulos;

class StoreDictamenRequest extends FormRequest
{
    use InteractsWithArchivo, InteractsWithArticulos;

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
                'unique:oficios,folio'
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
            'adquisiciones.*.producto_tipo_id' => [
                'required',
                'integer',
                'exists:producto_tipos,id'
            ],
            'adquisiciones.*.numero_inventario' => $this->numeroInventarioRules()
        ];
    }
}
