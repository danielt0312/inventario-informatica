<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class EmpleadoFactory extends Factory
{
    public function definition(): array
    {
        return [
            'nombre' => fake()->name()
        ];
    }

    public function withId(): Factory
    {
        return $this->state(fn () => [
            'id' => fake()->unique()->randomDigitNotNull(),
        ]);
    }
}
