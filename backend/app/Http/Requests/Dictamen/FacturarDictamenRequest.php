<?php

namespace App\Http\Requests\Dictamen;

use Illuminate\Validation\Rule;

class FacturarDictamenRequest extends ActionDictamenRequest
{
    public function authorize(): bool
    {
        return $this->dictamen->estado->esSurtir();
    }

    public function rules(): array
    {
        return [
            'productos' => ['required', 'array', 'min:1'],
            'productos.*.id' => [
                'required',
                'integer',
                Rule::exists('dictamen_productos', 'id')->where(function ($query) {
                    $query->where('dictamen_id', $this->dictamen->id);
                }),
            ],
            'productos.*.archivo_uuid' => ['required', 'exists:archivos,uuid']
        ];
    }
}
