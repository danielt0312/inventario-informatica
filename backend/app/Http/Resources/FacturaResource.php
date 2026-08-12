<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class FacturaResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'folio' => $this->folio,
            'fecha_emision' => $this->fecha_emision,
            'proveedor' => new ProveedorResource($this->whenLoaded('proveedor')),
            'archivo' => $this->whenLoaded('archivo'),
        ];
    }
}
