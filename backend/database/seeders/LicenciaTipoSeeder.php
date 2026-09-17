<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use App\Models\LicenciaTipo;
use App\Enums\LicenciaTipoEnum;

class LicenciaTipoSeeder extends Seeder
{
    use WithoutModelEvents;

    public function run(): void
    {
        foreach (LicenciaTipoEnum::casesToFormattedCatalog() as $case) {
            LicenciaTipo::create($case);
        }
    }
}
