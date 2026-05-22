<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use App\Models\DictamenEstado;
use App\Enums\DictamenEstadoEnum;

class DictamenEstadoSeeder extends Seeder
{
    use WithoutModelEvents;

    public function run(): void
    {
        foreach (DictamenEstadoEnum::cases() as $tipo) {
            DictamenEstado::insertOrIgnore([
                'id' => $tipo->value,
                'nombre' => $tipo->nombre(),
            ]);
        }
    }
}
