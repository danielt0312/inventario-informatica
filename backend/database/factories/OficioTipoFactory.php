<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class OficioTipoFactory extends Factory
{
    public function definition(): array
    {
        return [
            'nombre' => fake()->word()
        ];
    }
}
