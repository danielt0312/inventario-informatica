<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    public function run(): void
    {
        // todo eliminar esta invocación, solo es para debug
        $this->call([
            AdscripcionSeeder::class,
            EmpleadoSeeder::class,
            UserSeeder::class
        ]);

        $this->call([
            ArchivoTipoSeeder::class,
            ProductoSeeder::class,
            ArticuloEstadoSeeder::class,
            DocumentoTipoSeeder::class,
            DictamenEstadoSeeder::class
        ]);
    }
}
