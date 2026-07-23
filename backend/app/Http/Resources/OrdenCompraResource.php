<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OrdenCompraResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'fecha_solicitud' => $this->fecha_solicitud,
            'numero_orden' => $this->numero_orden,
            'proveedor' => new ProveedorResource($this->whenLoaded('proveedor')),
            'archivo' => new ArchivoResource($this->whenLoaded('archivo'))
        ];
    }
}
