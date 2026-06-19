<?php

namespace App\Http\Requests\Dictamen;

use Illuminate\Foundation\Http\FormRequest;

class StoreDictamenRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'adscripcion_id' => ['required', 'integer'],
            'folio' => ['required', 'string', 'max:64', 'unique:oficios,folio'],
            'fecha_solicitud' => ['required', 'date', 'before_or_equal:today'],
            'archivo' => ['required', 'file', 'max:5120', 'mimes:pdf'],
            'productos' => ['required', 'array', 'min:1'],
            'productos.*.empleado_id' => ['required', 'integer'],
            'productos.*.producto_tipo_id' => ['required', 'integer', 'exists:producto_tipos,id'],
            'productos.*.cantidad' => ['required', 'integer', 'gte:1', 'lte:255'],
            'productos.*.caracteristicas' => ['nullable', 'string', 'max:255'],
        ];
    }
}
