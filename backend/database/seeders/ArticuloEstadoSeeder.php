<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use App\Models\ArticuloEstado;

class ArticuloEstadoSeeder extends Seeder
{
    public function run(): void
    {
        ArticuloEstado::insertOrIgnore([
            ['nombre' => 'Activo'],
            ['nombre' => 'Baja preventiva'],
            ['nombre' => 'Baja'],
            ['nombre' => 'Por verificar y configurar'],
            ['nombre' => 'En mantenimiento'],
        ]);
    }
}
