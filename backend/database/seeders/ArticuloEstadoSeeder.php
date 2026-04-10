<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use App\Models\ArticuloEstado;
use App\ArticuloEstadoEnum;

class ArticuloEstadoSeeder extends Seeder
{
    public function run(): void
    {
        foreach (ArticuloEstadoEnum::cases() as $estado) {
            ArticuloEstado::insertOrIgnore([
                'id' => $estado->value,
                'nombre' => $estado->nombre(),
            ]);
        }
    }
}
