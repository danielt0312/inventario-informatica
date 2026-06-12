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
            $this->merge(new DocumentoResource($this->documento))
        ];
    }
}
