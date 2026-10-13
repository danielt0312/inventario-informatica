<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ArticuloUbicacionResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'articulo' => new ArticuloResource($this->whenLoaded('articulo')),
            'fecha_inicio' => $this->fecha_inicio,
            'fecha_fin' => $this->fecha_fin,
        ];
    }
}
