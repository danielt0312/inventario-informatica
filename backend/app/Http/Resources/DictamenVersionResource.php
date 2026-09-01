<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DictamenVersionResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'numero_version' => $this->numero_version,
            'fecha_solicitud' => $this->fecha_solicitud,
            'created_at' => $this->created_at,
            'adquisiciones' => DictamenAdquisicionResource::collection($this->whenLoaded('adquisiciones')),
            $this->when(
                !$this->dictamen->esEstadoDictaminar(),
                fn () => $this->merge(
                    ['archivo' => new ArchivoResource($this->whenLoaded('archivo'))]
                )
            ),
        ];
    }
}
