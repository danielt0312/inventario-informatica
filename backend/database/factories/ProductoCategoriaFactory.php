<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class ProductoCategoriaFactory extends Factory
{
    public function definition(): array
    {
        return [
            'nombre' => fake()->word(),
        ];
    }
}
