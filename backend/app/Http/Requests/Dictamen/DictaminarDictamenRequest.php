<?php

namespace App\Http\Requests\Dictamen;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use App\Http\Requests\Dictamen\Traits\InteractsWithDictamen;

class DictaminarDictamenRequest extends FormRequest
{
    use InteractsWithDictamen;

    public function authorize(): bool
    {
        return $this->dictamen->esEstadoDictaminar();
    }

    public function rules(): array
    {
        return [
            // todo validar que el tamaño sea el mismo
            'adquisiciones' => [
                'required',
                'array',
                'min:1'
            ],
            // todo validar que pertenezca al mismo dictamen
            'adquisiciones.*.id' => [
                'required',
                'integer',
                'exists:dictamen_adquisiciones,id',
            ],
            'adquisiciones.*.caracteristicas_adicionales' => [
                'sometimes',
                'nullable',
                'string',
                'max:255'
            ],
            'adquisiciones.*.producto_variante' => [
                'required',
                'array'
            ],
            'adquisiciones.*.producto_variante.tipo_id' => [
                'required',
                'integer',
                'exists:producto_tipos,id',
            ],
            'adquisiciones.*.producto_variante.marca_id' => [
                'required',
                'integer',
                'exists:producto_marcas,id',
            ],
            'adquisiciones.*.producto_variante.modelo' => [
                'required',
                'string',
                'max:128',
            ],

            // todo agregar validación dinámica según `adquisiciones.*.borrador.producto.tipo_id`
            'adquisiciones.*.producto_variante.spec' => [
                'sometimes',
                'nullable',
                'array'
            ]
        ];
    }
}
