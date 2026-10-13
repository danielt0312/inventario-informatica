<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class AreaFactory extends Factory
{
    public function definition(): array
    {
        return [
            'nombre' => fake()->jobTitle()
        ];
    }

    public function withId(): Factory
    {
        return $this->state(fn () => [
            'id' => fake()->unique()->randomDigitNotNull(),
        ]);
    }
}
