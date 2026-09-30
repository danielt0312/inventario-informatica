<?php

namespace App\Http\Requests\Dictamen;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Validator;

use App\Traits\Http\Requests\InteractsWithArchivo;
use App\Http\Requests\Dictamen\Traits\InteractsWithArticulos;
use App\Models\Articulo;

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
            'adquisiciones.*.numero_inventario' => [
                'sometimes',
                'nullable',
                'string',
                'max:13'
            ],
            'adquisiciones.*.borrador' => [
                'required',
                'array'
            ]
            'adquisiciones.*.borrador.producto.tipo_id' => [
                'required',
                'integer',
                'exists:producto_tipos,id',
            ],
            'adquisiciones.*.borrador.producto.marca_id' => [
                'sometimes',
                'nullable',
                'integer',
                'exists:producto_marcas,id',
            ],
            'adquisiciones.*.borrador.producto.modelo' => [
                'sometimes',
                'nullable',
                'string',
                'max:128',
                'unique:productos,modelo',
            ],

            // todo agregar validación dinámica según `adquisiciones.*.borrador.producto.tipo_id`
            'adquisiciones.*.borrador.spec' => [
                'sometimes',
                'nullable',
                'json'
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

    //             foreach ($adquisicionesPayload as $index => $adquisicionPayload) {
    //                 $this->validateNumeroInventario(
    //                     $validator,
    //                     $articulos,
    //                     $adquisicionPayload['producto_tipo_id'],
    //                     $adquisicionPayload['numero_inventario'],
    //                     "adquisiciones.$index.numero_inventario"
    //                 );
    //             }
    //         }
    //     ];
    // }
}
