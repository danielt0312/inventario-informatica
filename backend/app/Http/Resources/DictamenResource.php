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
            'fecha_solicitud' => $this->fecha_solicitud->format('Y-m-d'),
            'adscripcion_id' => $this->adscripcion_id,
            'productos' => DictamenProductoResource::collection($this->whenLoaded('productos')),
            'estado' => new DictamenEstadoResource($this->whenLoaded('estado')),
            'oficio' => new OficioResource($this->whenLoaded('oficio')),
            'documento' => new DocumentoResource($this->whenLoaded('documento')),
            'created_at' => $this->created_at
        ];
    }
}
