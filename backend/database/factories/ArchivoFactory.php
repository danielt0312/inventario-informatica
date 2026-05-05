<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

use App\Enums\ArchivoTipoEnum;

class ArchivoFactory extends Factory
{
    public function definition(): array
    {
        return [
            'nombre' => str_replace(' ', '_', fake()->words(rand(1, 5), true)),
            'tipo_id' => ArchivoTipoEnum::PDF->value,
        ];
    }

    public function pdf(): Factory {
        return $this->state(fn () => [
            'tipo_id' => ArchivoTipoEnum::PDF->value,
        ]);
    }

    public function jpg(): Factory {
        return $this->state(fn () => [
            'tipo_id' => ArchivoTipoEnum::JPG->value,
        ]);
    }
}
