<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DictamenAdquisicionResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $esEstadoDictaminar = $this->version->dictamen->esEstadoDictaminar();

        return [
            'id' => $this->id,
            'empleado_id' => $this->empleado_id,
            'cantidad' => $this->cantidad,
            'producto_tipo' => $this->when(
                $esEstadoDictaminar,
                function () {
                    return new ProductoTipoResource($this->tipo);
                }
            ),
            $this->when(
                !$esEstadoDictaminar,
                function () {
                    $this->producto->load('tipo.categoria', 'marca');

                    return $this->merge([
                        'caracteristicas' => $this->caracteristicas,
                        'producto' => new ProductoResource($this->producto),
                    ]);
                }
            ),
        ];
    }
}
