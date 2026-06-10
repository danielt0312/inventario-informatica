<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ArchivoTipoResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'archivo_tipo' => $this->nombre,
            'archivo_extension' => $this->extension
        ];
    }
}
