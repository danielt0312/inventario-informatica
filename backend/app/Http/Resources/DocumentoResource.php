<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DocumentoResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            $this->mergeWhen($this->relationLoaded('tipo'), [
                'documento' => $this->tipo->nombre
            ]),
            $this->merge(new ArchivoResource($this->archivo))
        ];
    }
}
