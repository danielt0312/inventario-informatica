<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\RamCapacidad;

class RamCapacidadSeeder extends Seeder
{
    public function run(): void
    {
        RamCapacidad::create(['nombre' => '4 GB']);
        RamCapacidad::create(['nombre' => '8 GB']);
        RamCapacidad::create(['nombre' => '16 GB']);
        RamCapacidad::create(['nombre' => '32 GB']);
    }
}
