<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProcesadorResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'nucleos' => $this->nucleos,
            'hilos' => $this->hilos,
            'frecuencia_maxima_ghz' => $this->frecuencia_maxima_ghz
        ];
    }
}
