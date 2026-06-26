<?php

namespace App\Http\Requests\Dictamen;

use Illuminate\Validation\Rule;

use App\Enums\DictamenEstadoEnum;

class DictaminarDictamenRequest extends ActionDictamenRequest
{
    public function authorize(): bool
    {
        return $this->dictamen->esEstado(DictamenEstadoEnum::DICTAMINAR);
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
            'productos.*.producto_id' => Rule::foreach(function ($_, string $attribute) {
                $index = explode('.', $attribute)[1];

                $dictamenProductoId = $this->input("productos.{$index}.id");

                $dictamenProducto = $this->dictamen->productos->firstWhere('id', $dictamenProductoId);

                $tipoId = $dictamenProducto?->productoTipo?->id;

                return [
                    'required',
                    'integer',
                    Rule::exists('productos', 'id')->where(function ($query) use ($tipoId) {
                        $query->where('tipo_id', $tipoId);
                    }),
                ];
            }),
            'productos.*.caracteristicas' => ['required', 'string', 'max:255']
        ];
    }
}
