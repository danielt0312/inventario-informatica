<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class AdscripcionFactory extends Factory
{
    public function definition(): array
    {
        return [
            'id' => fake()->unique()->randomDigitNotNull(),
            'nombre' => fake()->jobTitle()
        ];
    }
}
