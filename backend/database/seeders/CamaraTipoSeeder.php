<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\CamaraTipo;
use App\Enums\CamaraTipoEnum;

class CamaraTipoSeeder extends Seeder
{
    public function run(): void
    {
        CamaraTipo::upsert(CamaraTipoEnum::casesToFormattedCatalog(), ['id']);
    }
}
