<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DictamenProductoResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $esEstadoDictaminar = $this->dictamenVersion->dictamen->esEstadoDictaminar();

        return [
            'id' => $this->id,
            'empleado_id' => $this->empleado_id,
            'cantidad' => $this->cantidad,
            'caracteristicas' => $this->caracteristicas,
            $this->mergeWhen($esEstadoDictaminar, [
                'producto_tipo' => new ProductoTipoResource($this->tipo),
            ]),
            $this->mergeWhen(!$esEstadoDictaminar, [
                'producto' => new ProductoResource($this->producto),
            ]),
        ];
    }
}
