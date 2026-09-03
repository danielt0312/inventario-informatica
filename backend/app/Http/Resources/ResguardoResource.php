<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ResguardoResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'fecha_actualizacion' => $this->fecha_actualizacion,
            'fecha_cancelacion' => $this->fecha_cancelacion,
            'estado' => new ResguardoEstadoResource($this->whenLoaded('estado')),
            'archivo' => new ArchivoResource($this->whenLoaded('archivo')),
            'articulos_resguardados' => ResguardoArticuloResource::collection($this->whenLoaded('articulosResguardados')),
            'empleado' => \App\Models\Empleado::factory()->make(), // TODO cambiar por datos reales
            'adscripcion' => \App\Models\Adscripcion::factory()->make(), // TODO cambiar por datos reales
        ];
    }
}
