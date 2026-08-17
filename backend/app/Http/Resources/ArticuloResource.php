<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ArticuloResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'producto' => new ProductoResource($this->whenLoaded('producto')),
            'estado' => new ArticuloEstadoResource($this->whenLoaded('estado')),
            'numero_serie' => $this->numero_serie,
            'costo_unitario' => $this->costo_unitario,
            'factura' => new FacturaResource($this->whenLoaded('factura')),
            'qr_archivo' => new ArchivoResource($this->whenLoaded('qrArchivo')),
            'numero_inventario' => $this->numero_inventario,
            'cuenta_contable' => $this->cuenta_contable,
            'es_contable' => $this->es_contable,
            'es_resultado_esperado' => $this->es_resultado_esperado,
            'observaciones' => $this->observaciones,
            'dictamen' => new DictamenResource($this->whenLoaded('dictamen')),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
