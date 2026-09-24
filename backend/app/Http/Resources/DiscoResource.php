<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DiscoResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return array_merge(
            (new ProductoVarianteResource($this->resource))->resolve($request),
            [
                'disco' => [
                    'tipo' => new DiscoTipoResource($this->variante->tipo),
                    'capacidad' => new DiscoCapacidadResource($this->variante->capacidad),
                    'interfaz' => new DiscoInterfazResource($this->variante->interfaz),
                    'factor_forma' => new DiscoFactorFormaResource($this->variante->factor_forma)
                ]
            ]
        );
    }
}
