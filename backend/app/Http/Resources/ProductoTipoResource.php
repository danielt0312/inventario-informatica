<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductoTipoResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'nombre' => $this->nombre,
            'es_tangible' => $this->es_tangible,
            'categoria' => new ProductoCategoriaResource($this->whenLoaded('categoria')),
        ];
    }
}
