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
            // todo validar que `producto_tipo_id` sea igual al que se encuentre en `dictamen_adquisiciones.productos.tipo_id`
            'adquisiciones.*.producto_variante_id' => [
                'required',
                'integer',
                'exists:producto_variantes,id'
            ],
            'adquisiciones.*.especificaciones_tecnicas' => [
                'required',
                'string',
                'max:255'
            ]
        ];
    }
}
