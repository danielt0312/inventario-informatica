<?php

namespace App\Http\Requests\Dictamen;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

use App\Services\DictamenService;
use App\Enums\ProductoTipoEnum;
use App\Models\Producto;
use App\Rules\NumeroInventarioRule;
use App\Traits\Http\Requests\InteractsWithArchivo;
use App\Http\Requests\Dictamen\Traits\InteractsWithDictamen;

class UpdateDictamenRequest extends FormRequest
{
    use InteractsWithDictamen, InteractsWithArchivo;

    public function __construct(
        protected DictamenService $dictamenService
    ) {
        parent::__construct();
    }

    public function authorize(): bool
    {
        return $this->dictamen->esEstadoSurtir();
    }

    public function rules(): array
    {
        logger($this->dictamen->versionActual->oficio_id);

        return [
            'adscripcion_id' => ['required', 'integer'],
            'folio' => [
                'required',
                'string',
                'max:64',
                Rule::unique('oficios', 'folio')
                    ->ignore($this->dictamen->versionActual->oficio_id)
            ],
            'fecha_solicitud' => ['required', 'date', 'before_or_equal:today'],
            'archivo_uuid' => $this->archivoRule(),
            'adquisiciones' => ['required', 'array', 'min:1'],
            'adquisiciones.*.cantidad' => ['required', 'integer', 'gte:1', 'lte:255'],
            'adquisiciones.*.empleado_id' => ['required', 'integer'],
            'adquisiciones.*.producto_id' => ['required', 'integer', 'exists:productos,id'],
            'adquisiciones.*.numero_inventario' => Rule::foreach(function ($_, string $attribute) {
                $index = explode('.', $attribute)[1];
                $productoId = $this->input("adquisiciones.{$index}.producto_id");
                $producto = Producto::find($productoId);
                $productoTipoEnum = ProductoTipoEnum::tryFrom($producto->tipo_id);

                return [
                    Rule::excludeIf(fn () =>
                        $productoTipoEnum === null || !$this->dictamenService->productoRequiereNumeroInventario($productoTipoEnum)
                    ),
                    'required',
                    new NumeroInventarioRule,
                    'exists:articulos,numero_inventario'
                ];
            }),
            'adquisiciones.*.caracteristicas' => ['required', 'string', 'max:255']
        ];
    }
}
