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
            $this->mergeWhen($esEstadoDictaminar, [
                'producto_tipo' => new ProductoTipoResource($this->tipo),
            ]),
            $this->mergeWhen(!$esEstadoDictaminar, [
                'caracteristicas' => $this->caracteristicas,
                'producto' => new ProductoResource($this->producto),
            ]),
        ];
    }
}
