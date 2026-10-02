<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\ComputadoraTipo;
use App\Enums\ComputadoraTipoEnum;

class ComputadoraTipoSeeder extends Seeder
{
    public function run(): void
    {
        ComputadoraTipo::upsert(ComputadoraTipoEnum::casesToFormattedCatalog(), ['id']);
    }
}
