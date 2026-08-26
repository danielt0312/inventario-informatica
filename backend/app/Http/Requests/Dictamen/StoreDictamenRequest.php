<?php

namespace App\Http\Requests\Dictamen;

use Closure;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Validator;

use App\Services\{
    DictamenService,
    NumeroInventarioService
};
use App\Traits\Http\Requests\InteractsWithArchivo;
use App\Http\Requests\Dictamen\Traits\InteractsWithArticulos;
use App\Rules\NumeroInventarioFormatRule;
use App\Enums\ProductoTipoEnum;
use App\Models\{
    ProductoTipo,
    Articulo
};

class StoreDictamenRequest extends FormRequest
{
    protected array $numerosInventarioInvalido = [];
    protected array $articulos = [];
    protected array $articulosNumeroInventario = [];

    public function __construct(
        protected DictamenService $dictamenService
    ) {
        parent::__construct();
    }

    use InteractsWithArchivo;

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
            'adquisiciones.*.producto_tipo_id' => [
                'required',
                'integer',
                'exists:producto_tipos,id'
            ],
            'adquisiciones.*.numero_inventario' => [
                'nullable',
                'string'
            ]
        ];
    }

    public function after() {
        return [
            function (Validator $validator) {
                $validatorErrors = $validator->errors();
                if ($validatorErrors->isNotEmpty()) return;

                $adquisicionesPayload = collect($this->input('adquisiciones', []));

                $productoTipos = ProductoTipo::whereIn('id', $adquisicionesPayload->pluck('producto_tipo_id')->filter())
                    ->get()
                    ->keyBy('id');

                foreach ($adquisicionesPayload as $index => $adquisicionPayload) {
                    $productoTipo = $productoTipos->get($adquisicionPayload['producto_tipo_id']);
                    if (!$productoTipo) continue;

                    $productoTipoEnum = ProductoTipoEnum::tryFrom($productoTipo->id);
                    $numeroInventario = $adquisicionPayload['numero_inventario'] ?? null;

                    if (
                        $productoTipoEnum === null ||
                        !$this->dictamenService->productoTipoPuedeRequerirNumeroInventario($productoTipoEnum) ||
                        empty($numeroInventario)
                    ) continue;

                    $numeroInventarioKey = "adquisiciones.$index.numero_inventario";

                    if (!NumeroInventarioService::matches($numeroInventario)) {
                        $validatorErrors->add("adquisiciones.$index.numero_inventario", __('validation.regex', ['attribute' => $numeroInventarioKey]));
                        continue;
                    }

                    foreach ($this->getNumerosInventarioInvalido() as $numeroInventarioInvalido) {
                        if ($numeroInventarioInvalido === $numeroInventario) {
                            $validatorErrors->add("adquisiciones.$index.numero_inventario", __('validation.exists', ['attribute' => $numeroInventarioKey]));
                            continue;
                        }
                    }

                    foreach ($this->getArticulos() as $articulo) {
                        if ($articulo->numero_inventario === $numeroInventario) {
                            $this->setArticulosNumeroInventario($numeroInventario, $articulo);
                            continue;
                        }
                    }

                    $articulo = Articulo::where('numero_inventario', $adquisicionPayload['numero_inventario'])
                        ->first();

                    if (empty($articulo)) {
                        $validatorErrors->add("adquisiciones.$index.numero_inventario", __('validation.exists'));
                        $this->setNumerosInventarioInvalido($adquisicionPayload['numero_inventario']);
                        continue;
                    }

                    $this->setArticulos($articulo);
                    $this->setArticulosNumeroInventario($numeroInventario, $articulo);
                }
            }
        ];
    }

    protected function setNumerosInventarioInvalido(string $numeroInventario): void
    {
        $this->numerosInventarioInvalido[] = $numeroInventario;
    }

    protected function getNumerosInventarioInvalido(): array
    {
        return $this->numerosInventarioInvalido;
    }

    protected function setArticulos(Articulo $articulo): void
    {
        $this->articulos[] = $articulo;
    }

    protected function getArticulos(): array
    {
        return $this->articulos;
    }

    protected function setArticulosNumeroInventario(string $numeroInventario, Articulo $articulo): void
    {
        $this->articulosNumeroInventario[$numeroInventario] = $articulo;
    }

    public function getArticulosNumeroInventario(string $numeroInventario): Articulo | null
    {
        return $this->articulosNumeroInventario[$numeroInventario];
    }
}
