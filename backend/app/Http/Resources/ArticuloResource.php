<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ArticuloResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'uuid' => $this->uuid,
            'numero_serie' => $this->numero_serie,
            'costo_unitario' => $this->costo_unitario,
            'numero_inventario' => $this->numero_inventario,
            'cuenta_contable' => $this->cuenta_contable,
            'es_inventariable' => $this->es_inventariable,
            'estado' => new ArticuloEstadoResource($this->whenLoaded('estado')),
            'producto_variante' => new ProductoVarianteResource($this->whenLoaded('productoVariante')),
            'factura' => new FacturaResource($this->whenLoaded('factura')),
            'qr_archivo' => new ArchivoResource($this->whenLoaded('qrArchivo')),
            'surtimiento' => new DictamenSurtimientoResource($this->whenLoaded('surtimiento')),
            'ubicaciones' => ArticuloUbicacionResource::collection($this->whenLoaded('ubicaciones')),
            'ubicacionActual' => new ArticuloUbicacionResource($this->whenLoaded('ubicacionActual')),
        ];
    }
}
