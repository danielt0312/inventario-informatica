<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DiscoResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'tipo' => new DiscoTipoResource($this->tipo),
            'capacidad' => new DiscoCapacidadResource($this->capacidad),
            'interfaz' => new DiscoInterfazResource($this->interfaz),
            'factor_forma' => new DiscoFactorFormaResource($this->factor_forma)
        ];
    }
}
