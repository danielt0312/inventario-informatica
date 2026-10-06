<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CamaraResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'tipo' => new CamaraTipoResource($this->tipo)
        ];
    }
}
