<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DictamenProductoResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'empleado_id' => $this->empleado_id,
            'cantidad' => $this->cantidad,
            'caracteristicas' => $this->caracteristicas,
            $this->mergeWhen($this->dictamen->esEstadoDictaminar(), [
                'producto_tipo' => new ProductoTipoResource($this->tipo),
            ]),
            $this->mergeWhen(!$this->dictamen->esEstadoDictaminar(), [
                'producto' => new ProductoResource($this->producto),
            ]),
        ];
    }
}
