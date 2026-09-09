<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductoResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'modelo' => $this->modelo,
            'tipo' => new ProductoTipoResource($this->whenLoaded('tipo')),
            'marca' => new ProductoMarcaResource($this->whenLoaded('marca'))
        ];
    }
}
