<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

use App\Models\{ProductoTipo, ProductoMarca};

class ProductoFactory extends Factory
{
    public function definition(): array
    {
        return [
            'tipo_id' => ProductoTipo::factory(),
            'marca_id' => ProductoMarca::factory(),
            'nombre' => fake()->word(),
        ];
    }
}
