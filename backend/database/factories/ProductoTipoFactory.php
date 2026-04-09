<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

use App\Models\ProductoCategoria;

class ProductoTipoFactory extends Factory
{
    public function definition(): array
    {
        return [
            'categoria_id' => ProductoCategoria::factory(),
            'nombre' => fake()->word(),
        ];
    }
}
