<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DictamenResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'uuid' => $this->uuid,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'estado' => new DictamenEstadoResource($this->whenLoaded('estado')),
            'orden_compra' => $this->when(
                $this->esEstadoSurtido() || $this->esEstadoSurtidoParcial() || $this->esEstadoSurtidoConObservaciones(),
                fn () => new OrdenCompraResource($this->whenLoaded('ordenCompra'))
            ),
            'version_actual' => new DictamenVersionResource($this->whenLoaded('versionActual')),
            'versiones' => DictamenVersionResource::collection($this->whenLoaded('versiones'))
        ];
    }
}
