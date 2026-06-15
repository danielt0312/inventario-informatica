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
            'producto' => new ProductoResource($this->whenLoaded('producto')),
            'cantidad' => $this->cantidad,
            'caracteristicas' => $this->caracteristicas
        ];
    }
}
