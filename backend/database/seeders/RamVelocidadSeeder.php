<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\RamVelocidad;

class RamVelocidadSeeder extends Seeder
{
    public function run(): void
    {
        RamVelocidad::create(['nombre' => '1333 MHz']);
        RamVelocidad::create(['nombre' => '1600 MT/s']);
        RamVelocidad::create(['nombre' => '3200 MT/s']);
        RamVelocidad::create(['nombre' => '4800 MT/s']);
    }
}
