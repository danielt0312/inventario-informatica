<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class EmpleadoFactory extends Factory
{
    public function definition(): array
    {
        return [
            'id' => fake()->unique()->randomDigitNotNull(),
            'nombre' => fake()->name()
        ];
    }
}
