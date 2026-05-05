<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

use App\Models\Archivo;
use App\Enums\DocumentoTipoEnum;

class DocumentoFactory extends Factory
{
    public function definition(): array
    {
        return [
            'tipo_id' => DocumentoTipoEnum::RESGUARDO->value,
            'archivo_id' => Archivo::factory()
        ];
    }
}
