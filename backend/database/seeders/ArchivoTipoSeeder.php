<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use App\Models\ArchivoTipo;
use App\Enums\AvailableFileExtensions;

class ArchivoTipoSeeder extends Seeder
{
    use WithoutModelEvents;

    public function run(): void
    {
        foreach (AvailableFileExtensions::cases() as $tipo) {
            ArchivoTipo::insertOrIgnore([
                'id' => $tipo->value,
                'nombre' => $tipo->nombre(),
                'extension' => $tipo->extension()
            ]);
        }
    }
}
