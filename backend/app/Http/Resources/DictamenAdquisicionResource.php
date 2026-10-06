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
            'caracteristicas_adicionales' => $this->caracteristicas_adicionales,
            'articulo' => new ArticuloResource($this->whenLoaded('articulo')),
            $this->mergeWhen($dictamen->esEstadoDictaminar(), [
                'borrador_producto_variante' => json_decode($this->borrador_producto_variante),
            ]),
            $this->mergeWhen(
                ! $dictamen->esEstadoDictaminar(),
                function () {
                    $this->loadMissing('productoVariante');

                    return [
                        'producto_variante' => new ProductoVarianteResource($this->productoVariante),
                    ];
                }
            ),
            $this->when(
                $dictamen->esEstadoInventariar(),
                function () {
                    $this->loadCount('surtimientos');

                    return $this->merge([
                        'cantidad_surtida' => $this->surtimientos_count,
                        'cantidad_restante' => $this->cantidad - $this->surtimientos_count,
                    ]);
                }
            )
        ];
    }
}
