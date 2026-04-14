<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

use App\Models\Producto;

class ArticuloFactory extends Factory
{
    public function definition(): array
    {
        return [
            'producto_id' => Producto::factory(),
            'contable' => 0,
        ];
    }

    public function contable(): Factory
    {
        return $this->state(fn () => [
            'contable' => 1,
            'costo_unitario' => fake()->randomFloat(2, max: 7),
        ]);
    }

    public function noContable(): Factory
    {
        return $this->state(fn () => [
            'contable' => 0,
        ]);
    }
}
