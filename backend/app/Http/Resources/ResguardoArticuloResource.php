<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ResguardoArticuloResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'resguardo' => new ResguardoResource($this->whenLoaded('resguardo')),
            'articulo' => new ArticuloResource($this->whenLoaded('articulo')),
            'fecha_asignacion' => $this->fecha_asignacion,
            'fecha_cancelacion' => $this->fecha_cancelacion
        ];
    }
}
