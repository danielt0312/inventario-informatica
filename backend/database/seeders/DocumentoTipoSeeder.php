<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use App\Models\DocumentoTipo;
use App\DocumentoTipoEnum;

class DocumentoTipoSeeder extends Seeder
{
    use WithoutModelEvents;

    public function run(): void
    {
        foreach (DocumentoTipoEnum::cases() as $tipo) {
            DocumentoTipo::insertOrIgnore([
                'id' => $tipo->value,
                'nombre' => $tipo->nombre(),
            ]);
        }
    }
}
