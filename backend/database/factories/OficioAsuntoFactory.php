<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

use App\Models\OficioTipo;

class OficioAsuntoFactory extends Factory
{
    public function definition(): array
    {
        return [
            'tipo_id' => OficioTipo::factory(),
            'nombre' => fake()->word()
        ];
    }
}
