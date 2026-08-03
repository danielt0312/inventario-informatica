<?php

namespace App\Http\Requests\Dictamen;

use Closure;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

use App\Models\Archivo;
use App\Services\DictamenService;
use App\Enums\ProductoTipoEnum;
use App\Rules\NumeroInventarioRule;

class StoreDictamenRequest extends FormRequest
{
    public function __construct(
        protected DictamenService $dictamenService
    ) {
        parent::__construct();
    }

    private Archivo $archivo;

    public function rules(): array
    {
        return [
            'adscripcion_id' => ['required', 'integer'],
            'folio' => ['required', 'string', 'max:64', 'unique:oficios,folio'],
            'fecha_solicitud' => ['required', 'date', 'before_or_equal:today'],
            'archivo_uuid' => ['bail', 'required', 'uuid', 'exists:archivos,uuid'],
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

    protected function passedValidation(): void
    {
        $this->setArchivo(
            Archivo::where('uuid', $this->input('archivo_uuid'))
                ->first()
        );
    }

    protected function setArchivo(Archivo $archivo): void
    {
        $this->archivo = $archivo;
    }

    public function getArchivo(): Archivo
    {
        return $this->archivo;
    }
}
