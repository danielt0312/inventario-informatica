<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

use App\Models\Articulo;

class CustodiaFactory extends Factory
{
    public function definition(): array
    {
        return [
            'articulo_id' => Articulo::factory(),
            'fecha_asignacion' => fake()->date(),
        ];
    }
}
