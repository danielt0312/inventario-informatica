<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class RamResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'tipo' => new RamTipoResource($this->tipo),
            'capacidad' => new RamCapacidadResource($this->capacidad),
            'velocidad' => new RamVelocidadResource($this->velocidad),
        ];
    }
}
