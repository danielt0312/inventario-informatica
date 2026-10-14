<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\RamVelocidad;

class RamVelocidadSeeder extends Seeder
{
    public function run(): void
    {
        RamVelocidad::upsert([
            ['nombre' => '1333 MHz'],
            ['nombre' => '1600 MT/s'],
            ['nombre' => '3200 MT/s'],
            ['nombre' => '4800 MT/s']
        ], ['nombre'], ['nombre']);
    }
}
