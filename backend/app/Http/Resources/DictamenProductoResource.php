<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DictamenProductoResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'empleado_id' => $this->empleado_id,
            'cantidad' => $this->cantidad,
            'caracteristicas' => $this->caracteristicas,
            'producto' => [
                'categoria' => new ProductoCategoriaResource($this->categoria),
                'tipo' => new ProductoTipoResource($this->tipo),
                $this->mergeWhen($this->producto_id, [
                    'marca' => new ProductoMarcaResource($this->marca),
                    'modelo' => new ProductoResource($this->producto)
                ])
            ]
        ];
    }
}
