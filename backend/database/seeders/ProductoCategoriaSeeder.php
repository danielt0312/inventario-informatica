<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use App\Models\ProductoCategoria;

class ProductoCategoriaSeeder extends Seeder
{
    use WithoutModelEvents;

    public function run(): void
    {
        ProductoCategoria::insertOrIgnore([
            ['nombre' => 'Computadora'],
            ['nombre' => 'Dispositivo de Almacenamiento'],
            ['nombre' => 'Telefonía'],
            ['nombre' => 'Redes'],
            ['nombre' => 'Refacción'],
            ['nombre' => 'Herramienta'],
            ['nombre' => 'Audio'],
            ['nombre' => 'Cámara y Video'],
            ['nombre' => 'Proyección'],
            ['nombre' => 'Impresora'],
            ['nombre' => 'Periférico'],
            ['nombre' => 'Eléctrico'],
            ['nombre' => 'Escáner'],
            ['nombre' => 'Memoria de Acceso Aleatorio'],
        ]);
    }
}
