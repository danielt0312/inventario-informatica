<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\RamTipo;

class RamTipoSeeder extends Seeder
{
    public function run(): void
    {
        RamTipo::create(['nombre' => 'SDRAM']);
        RamTipo::create(['nombre' => 'DDR']);
        RamTipo::create(['nombre' => 'DDR2']);
        RamTipo::create(['nombre' => 'DDR3']);
        RamTipo::create(['nombre' => 'DDR4']);
    }
}
