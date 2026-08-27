<?php

namespace App\Http\Requests\Dictamen;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Validator;

use App\Traits\Http\Requests\InteractsWithArchivo;
use App\Http\Requests\Dictamen\Traits\{
    InteractsWithDictamen,
    InteractsWithArticulos
};
use App\Models\{
    Articulo,
    Producto
};

class UpdateDictamenRequest extends FormRequest
{
    use InteractsWithDictamen, InteractsWithArchivo, InteractsWithArticulos;

    public function authorize(): bool
    {
        return $this->dictamen->esEstadoSurtir();
    }

    public function rules(): array
    {
        return [
            'folio' => [
                'required',
                'string',
                'max:64',
                Rule::unique('oficios', 'folio')
                    ->ignore($this->dictamen->versionActual->oficio_id)
            ],
            'motivo_cambio' => [
                'string',
                'max:64'
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
            'adquisiciones.*.producto_id' => [
                'required',
                'integer',
                'exists:productos,id'
            ],
            'adquisiciones.*.numero_inventario' => [
                'nullable',
                'string'
            ],
            'adquisiciones.*.especificaciones_tecnicas' => [
                'required',
                'string',
                'max:255'
            ],
        ];
    }

    public function after() {
        return [
            function (Validator $validator) {
                if ($validator->errors()->isNotEmpty()) return;

                $adquisicionesPayload = collect($this->input('adquisiciones'));

                $numerosInventarioPayload = $adquisicionesPayload->pluck('numero_inventario')
                    ->filter()
                    ->unique();

                if ($numerosInventarioPayload->isEmpty()) return;

                $articulos = Articulo::whereIn('numero_inventario', $numerosInventarioPayload)
                    ->get();

                $productos = Producto::whereIn('id', $adquisicionesPayload->pluck('producto_id')->unique())
                    ->get()
                    ->keyBy('id');

                foreach ($adquisicionesPayload as $index => $adquisicionPayload) {
                    $this->validateNumeroInventario(
                        $validator,
                        $articulos,
                        $productos->get($adquisicionPayload['producto_id'])->tipo_id,
                        $adquisicionPayload['numero_inventario'],
                        "adquisiciones.$index.numero_inventario"
                    );
                }
            }
        ];
    }
}
