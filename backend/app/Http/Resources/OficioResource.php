<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OficioResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'folio' => $this->folio,
            'verified_at' => $this->verified_at,
            'archivo' => new ArchivoResource($this->whenLoaded('archivo')),
        ];
    }
}
