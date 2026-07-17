<?php

namespace App\Http\Requests\Dictamen;

use Illuminate\Validation\Rule;

class DictaminarDictamenRequest extends ActionDictamenRequest
{
    public function authorize(): bool
    {
        return $this->dictamen->esEstadoDictaminar();
    }

    public function rules(): array
    {
        return [
            'adquisiciones' => ['required', 'array', 'min:1'],
            'adquisiciones.*.id' => [
                'required',
                'integer',
                Rule::exists('dictamen_productos', 'id')->where(function ($query) {
                    $query->where('dictamen_id', $this->dictamen->id);
                }),
            ],
            'adquisiciones.*.producto_id' => Rule::foreach(function ($_, string $attribute) {
                $index = explode('.', $attribute)[1];
                $adquisicionId = $this->input("adquisiciones.{$index}.id");
                $adquisicion = $this->dictamen->adquisiciones->firstWhere('id', $adquisicionId);
                $tipoId = $adquisicion?->productoTipo?->id;

                return [
                    'required',
                    'integer',
                    Rule::exists('productos', 'id')->where(function ($query) use ($tipoId) {
                        $query->where('tipo_id', $tipoId);
                    }),
                ];
            }),
            'adquisiciones.*.caracteristicas' => ['required', 'string', 'max:255']
        ];
    }
}
