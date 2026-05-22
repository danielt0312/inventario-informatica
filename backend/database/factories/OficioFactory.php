<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

use App\Models\{
    Documento,
    OficioAsunto
};

class OficioFactory extends Factory
{
    public function definition(): array
    {
        return [
            'documento_id' => Documento::factory(),
            'asunto_id' => OficioAsunto::factory(),
            'folio' => fake()->unique()->word()
        ];
    }
}
