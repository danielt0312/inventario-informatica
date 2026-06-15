<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

use App\Models\DictamenProducto;

class DictamenResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'uuid' => $this->uuid,
            'fecha_solicitud' => $this->fecha_solicitud,
            'adscripcion_id' => $this->adscripcion_id,
            'productos' => DictamenProductoResource::collection($this->whenLoaded('productos')),
            'estado' => new DictamenEstadoResource($this->whenLoaded('estado')),
            'oficio' => new OficioResource($this->whenLoaded('oficio')),
            'documento' => new DocumentoResource($this->whenLoaded('documento')),
            'created_at' => $this->created_at
        ];
    }
}
