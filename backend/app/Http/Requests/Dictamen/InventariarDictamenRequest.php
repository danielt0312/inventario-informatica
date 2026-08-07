<?php

namespace App\Http\Requests\Dictamen;

use Illuminate\Foundation\Http\FormRequest;
use App\Traits\Http\Requests\InteractsWithArchivo;

use App\Models\Factura;
use App\Http\Requests\Dictamen\Traits\InteractsWithDictamen;

class InventariarDictamenRequest extends FormRequest
{
    use InteractsWithDictamen, InteractsWithArchivo;

    private array $facturas;

    public function authorize(): bool
    {
        return $this->dictamen->esEstadoInventariar();
    }

    public function rules(): array
    {
        return [
            'archivo_uuid' => $this->archivoRules(),
            'adquisiciones' => [
                'required',
                'array'
            ],
            'adquisiciones.*.resultado_esperado' => [
                'required',
                'boolean'
            ],
            'adquisiciones.*.observaciones' => [
                'exclude_unless:adquisiciones.*.resultado_esperado,false',
                'required',
                'string',
                'max:255'
            ],
            'adquisiciones.*.producto_id' => [
                'required',
                'integer',
                'exists:productos,id'
            ],
            'adquisiciones.*.cuenta_contable' => [
                'required',
                'string',
                'size:11',
                'distinct',
                'unique:articulos,cuenta_contable'
            ],
            'adquisiciones.*.numero_serie' => [
                'required',
                'string',
                'max:64',
                'distinct',
                'unique:articulos,numero_serie'
            ],
            'adquisiciones.*.es_contable' => [
                'required',
                'string',
                'max:64',
                'distinct',
                'unique:articulos,numero_serie'
            ],
            'adquisiciones.*.costo_unitario' => [
                'nullable',
                'required_if:adquisiciones.*.es_contable,true',
                'decimal:7,2',
                'max:64', 'distinct',
                'unique:articulos,numero_serie'
            ],
            'adquisiciones.*.factura_uuid' => [
                'bail',
                'required',
                'uuid',
                function (string $attribute, string $value) {
                    $factura = Factura::query()
                        ->join('documentos', 'documentos.id', '=', 'facturas.documento_id')
                        ->join('archivos', 'archivos.id', '=', 'documentos.archivo_id')
                        ->where('archivos.uuid', $value)
                        ->select('facturas.*')
                        ->firstOrFail();

                    $this->setFactura($factura, $value);
                }
            ]
        ];
    }

    protected function setFactura(Factura $factura, string $uuid)
    {
        $this->facturas[$uuid] = $factura;
    }

    public function getFactura(string $uuid): Factura | null
    {
        return $this->facturas[$uuid];
    }
}
