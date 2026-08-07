<?php

namespace App\Http\Requests\Dictamen;

use Closure;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

use App\Services\DictamenService;
use App\Enums\ProductoTipoEnum;
use App\Rules\NumeroInventarioRule;
use App\Traits\Http\Requests\InteractsWithArchivo;

class StoreDictamenRequest extends FormRequest
{
    use InteractsWithArchivo;

    public function __construct(
        protected DictamenService $dictamenService
    ) {
        parent::__construct();
    }

    public function rules(): array
    {
        return [
            'adscripcion_id' => ['required', 'integer'],
            'folio' => ['required', 'string', 'max:64', 'unique:oficios,folio'],
            'fecha_solicitud' => ['required', 'date', 'before_or_equal:today'],
            'archivo_uuid' => $this->archivoRules(),
            'adquisiciones' => ['required', 'array', 'min:1'],
            'adquisiciones.*.cantidad' => ['required', 'integer', 'gte:1', 'lte:255'],
            'adquisiciones.*.empleado_id' => ['required', 'integer'],
            'adquisiciones.*.producto_tipo_id' => ['required', 'integer', 'exists:producto_tipos,id'],
            'adquisiciones.*.numero_inventario' => Rule::foreach(function ($_, string $attribute) {
                $index = explode('.', $attribute)[1];
                $tipo = $this->input("adquisiciones.{$index}.producto_tipo_id");
                $tipoEnum = ProductoTipoEnum::tryFrom($tipo);

                return [
                    Rule::excludeIf(fn () =>
                        $tipoEnum === null || !$this->dictamenService->productoRequiereNumeroInventario($tipoEnum)
                    ),
                    'required',
                    new NumeroInventarioRule,
                    'exists:articulos,numero_inventario'
                ];
            })
        ];
    }
}
