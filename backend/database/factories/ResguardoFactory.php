<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

use App\Models\User;

class ResguardoFactory extends Factory
{
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'fecha_actualizacion' => fake()->date(),
        ];
    }

    public function inactivo(): Factory
    {
        return $this->state(fn () => [
            'activo' => 0,
        ]);
    }
}
