<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class FacturaResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'fecha_emision' => $this->fecha_emision,
            $this->merge(new DocumentoResource($this->documento))
        ];
    }
}
