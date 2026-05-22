<?php

namespace App\Http\Requests\Dictamen;

use Illuminate\Foundation\Http\FormRequest;

class StoreDictamenRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'adscripcion_id' => ['required', 'integer'],
            'folio' => ['required', 'string', 'max:64'],
            'fecha_solicitud' => ['required', 'date', 'before_or_equal:today'],
            'archivo' => ['required', 'file', 'mimes:pdf'],
            'productos' => ['required', 'array', 'min:1'],
            'productos.*.cantidad' => ['required', 'integer', 'min:1'],
            'productos.*.producto_id' => ['required', 'integer', 'exists:productos.id'],
            'productos.*.caracteristicas' => ['nullable', 'string', 'max:255'],
            'productos.*.empleado_id' => ['required', 'integer', 'exists:empleados,id'],
        ];
    }
}
