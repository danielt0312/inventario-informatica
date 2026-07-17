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
            'version' => $this->version,
            'fecha_solicitud' => $this->fecha_solicitud->format('Y-m-d'),
            'adscripcion_id' => $this->adscripcion_id,
            'created_at' => $this->created_at,
            'adquisiciones' => DictamenAdquisicionResource::collection($this->whenLoaded('adquisiciones')),
            'oficio' => new OficioResource($this->whenLoaded('oficio')),
            'documento' => $this->when(
                !$this->dictamen->esEstadoDictaminar(),
                fn () => new DocumentoResource($this->whenLoaded('documento'))
            ),
        ];
    }
}
