<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Enums\ProductoTipoEnum;

class ProductoVarianteResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'descripcion' => $this->descripcion,
            $this->merge(
                function () use ($request) {
                    $this->loadMissing('producto.tipo.categoria', 'producto.marca');

                    return ProductoResource::make($this->producto)
                        ->toArray($request);
                }
            ),
            'spec' => $this->when(
                $this->variante_type !== null,
                fn () => ProductoTipoEnum::tryFromVarianteModel($this->variante)
                    ->varianteResourceClass()::make($this->variante)
                    ->toArray($request)
            )
        ];
    }
}
