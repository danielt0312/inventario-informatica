<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DictamenResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            ...parent::toArray($request),
            'oficio' => new OficioResource($this->whenLoaded('oficio'))
        ];
    }
}
