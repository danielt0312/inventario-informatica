<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ResguardoResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'uuid' => $this->uuid,
            'fecha_actualizacion' => $this->fecha_actualizacion,
            'fecha_cancelacion' => $this->fecha_cancelacion,
            'estado' => new ResguardoEstadoResource($this->whenLoaded('estado')),
            'archivo' => new ArchivoResource($this->whenLoaded('archivo')),
            'articulos_resguardados' => ResguardoArticuloResource::collection($this->whenLoaded('articulosResguardados')),
            // TODO cambiar por datos reales
            'empleado' => new EmpleadoResource(\App\Models\Empleado::factory()->make([
                'id' => $this->empleado_id,
            ])),
            'area' => new AreaResource(\App\Models\Area::factory()->make([
                'id' => 1
            ])),
        ];
    }
}
