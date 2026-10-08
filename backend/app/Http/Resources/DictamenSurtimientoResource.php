<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DictamenSurtimientoResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'es_resultado_esperado' => $this->es_resultado_esperado,
            'observaciones' => $this->observaciones
        ];
    }
}
