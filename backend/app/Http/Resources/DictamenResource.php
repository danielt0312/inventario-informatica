<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DictamenResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'uuid' => $this->uuid,
            'created_at' => $this->created_at,
            'estado' => new DictamenEstadoResource($this->whenLoaded('estado')),
            'orden_compra' => new OrdenCompraResource($this->whenLoaded('ordenCompra')),
            'version' => new DictamenVersionResource($this->whenLoaded('version'))
        ];
    }
}
