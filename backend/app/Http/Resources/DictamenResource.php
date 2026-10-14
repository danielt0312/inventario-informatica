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
            //debug
            'area' => new AreaResource(\App\Models\Area::factory()->make([
                'id' => $this->area_id
            ])),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'oficio' => new OficioResource($this->whenLoaded('oficio')),
            'estado' => new DictamenEstadoResource($this->whenLoaded('estado')),
            'version_actual' => new DictamenVersionResource($this->whenLoaded('versionActual')),
            'folio' => $this->whenLoaded(
                'versionActual',
                fn () => $this->folio
            ),
            'versiones' => DictamenVersionResource::collection($this->whenLoaded('versiones')),
            $this->when(
                $this->esEstadoPorInventariar() && ! empty($this->orden_compra_id),
                function () {
                    $this->load(['ordenCompra' => ['proveedor', 'archivo']]);

                    return $this->merge([
                        'orden_compra' => new OrdenCompraResource($this->ordenCompra)
                    ]);
                }
            ),
            $this->when(
                $this->esEstadoSurtido() || $this->esEstadoSurtidoParcial(),
                fn () => $this->merge([
                    'tiene_observaciones' => $this->tiene_observaciones
                ])
            ),
        ];
    }
}
