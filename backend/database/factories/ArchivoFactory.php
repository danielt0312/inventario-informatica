<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

use App\Enums\AvailableFileExtensions;

class ArchivoFactory extends Factory
{
    public function definition(): array
    {
        return [
            'nombre' => fake()->slug(rand(1, 5)),
            'tipo_id' => AvailableFileExtensions::PDF->value,
        ];
    }

    public function pdf(): Factory {
        return $this->state(fn () => [
            'tipo_id' => AvailableFileExtensions::PDF->value,
        ]);
    }

    public function jpg(): Factory {
        return $this->state(fn () => [
            'tipo_id' => AvailableFileExtensions::JPG->value,
        ]);
    }
}
