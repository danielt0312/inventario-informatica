<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use App\Models\ArchivoTipo;

class ArchivoTipoSeeder extends Seeder
{
    public function run(): void
    {
        ArchivoTipo::insert([
            ['nombre' => 'Adobe Portable Document Format', 'extension' => '.pdf'],
            ['nombre' => 'Imágen JPEG', 'extension' => '.jpeg']
        ]);
    }
}
