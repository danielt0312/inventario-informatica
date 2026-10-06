<?php

namespace App\Http\Requests\Dictamen;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Validator;

use App\Http\Requests\Dictamen\Traits\{
    InteractsWithDictamen,
    InteractsWithArticulos
};

use App\Models\{
    Articulo,
    Producto
};

class CorregirDictamenRequest extends FormRequest
{
    use InteractsWithDictamen, InteractsWithArticulos;

    public function authorize(): bool
    {
        return $this->dictamen->esEstadoSurtir();
    }

    public function rules(): array
    {
        return [
            'motivo_cambio' => [
                'string',
                'max:64'
            ],
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
            'adquisiciones.*.numero_inventario' => [
                'sometimes',
                'nullable',
                'string',
                'max:13'
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

    // public function after() {
    //     return [
    //         function (Validator $validator) {
    //             if ($validator->errors()->isNotEmpty()) return;

    //             $adquisicionesPayload = collect($this->input('adquisiciones'));

    //             $numerosInventarioPayload = $adquisicionesPayload->pluck('numero_inventario')
    //                 ->filter()
    //                 ->unique();

    //             if ($numerosInventarioPayload->isEmpty()) return;

    //             $articulos = Articulo::whereIn('numero_inventario', $numerosInventarioPayload)
    //                 ->get();

    //             $productos = Producto::whereIn('id', $adquisicionesPayload->pluck('producto_id')->unique())
    //                 ->get()
    //                 ->keyBy('id');

    //             foreach ($adquisicionesPayload as $index => $adquisicionPayload) {
    //                 $this->validateNumeroInventario(
    //                     $validator,
    //                     $articulos,
    //                     $productos->get($adquisicionPayload['producto_id'])->tipo_id,
    //                     $adquisicionPayload['numero_inventario'],
    //                     "adquisiciones.$index.numero_inventario"
    //                 );
    //             }
    //         }
    //     ];
    // }
}
