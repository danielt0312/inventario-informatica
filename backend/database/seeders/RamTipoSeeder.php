<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\RamTipo;

class RamTipoSeeder extends Seeder
{
    public function run(): void
    {
        RamTipo::upsert([
            ['nombre' => 'SDRAM'],
            ['nombre' => 'DDR'],
            ['nombre' => 'DDR2'],
            ['nombre' => 'DDR3'],
            ['nombre' => 'DDR4']
        ], ['nombre'], ['nombre']);
    }
}
