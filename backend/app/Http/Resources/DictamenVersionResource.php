<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DictamenVersionResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'fecha_solicitud' => $this->fecha_solicitud->format('Y-m-d'),
            'adscripcion_id' => $this->adscripcion_id,
            'created_at' => $this->created_at,
            'documento' => new DocumentoResource($this->whenLoaded('documento')),
            'dictamen_productos' => DictamenProductoResource::collection($this->whenLoaded('dictamenProductos')),
        ];
    }
}
