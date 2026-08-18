<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DictamenAdquisicionResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $dictamen = $this->version->dictamen;

        return [
            'id' => $this->id,
            'empleado_id' => $this->empleado_id,
            'cantidad' => $this->cantidad,
            'articulo' => new ArticuloResource($this->whenLoaded('articulo')),
            'articulos' => ArticuloResource::collection($this->whenLoaded('articulos')),
            'producto_tipo' => $this->when(
                $dictamen->esEstadoDictaminar(),
                fn() => new ProductoTipoResource($this->tipo)
            ),
            $this->when(
                ! $dictamen->esEstadoDictaminar(),
                function () {
                    $this->producto->load('tipo.categoria', 'marca');

                    return $this->merge([
                        'caracteristicas' => $this->caracteristicas,
                        'producto' => new ProductoResource($this->producto),
                    ]);
                }
            ),
            $this->when(
                $dictamen->esEstadoInventariar(),
                function () {
                    $this->loadCount('articulos');

                    return $this->merge([
                        'cantidad_surtida' => $this->articulos_count,
                        'cantidad_restante' => $this->cantidad - $this->articulos_count,
                    ]);
                }
            )
        ];
    }
}
