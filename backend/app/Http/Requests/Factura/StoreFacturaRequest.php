<?php

namespace App\Http\Requests\Factura;

use Illuminate\Foundation\Http\FormRequest;

use App\Models\OrdenCompra;
use App\Traits\Http\Requests\InteractsWithArchivo;

class StoreFacturaRequest extends FormRequest
{
    use InteractsWithArchivo;

    protected OrdenCompra $ordenCompra;

    public function rules(): array
    {
        return [
            'orden_compra_uuid' => [
                'bail',
                'required',
                'uuid',
                function (string $attribute, string $value) {
                    $ordenCompra = OrdenCompra::query()
                        ->join('documentos', 'documentos.id', '=', 'facturas.documento_id')
                        ->join('archivos', 'archivos.id', '=', 'documentos.archivo_id')
                        ->where('archivos.uuid', $value)
                        ->select('orden_compras.*')
                        ->firstOrFail();

                    $this->setOrdenCompra($ordenCompra);
                }
            ],
            'fecha_emision' => [
                'required',
                'date',
                'before_or_equal:today'
            ],
            'archivo_uuid' => $this->archivoRules(),
        ];
    }

    protected function setOrdenCompra(OrdenCompra $ordenCompra)
    {
        $this->ordenCompra = $ordenCompra;
    }

    public function getOrdenCompra(): OrdenCompra
    {
        return $this->ordenCompra;
    }
}
