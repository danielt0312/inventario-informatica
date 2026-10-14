<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\RamCapacidad;

class RamCapacidadSeeder extends Seeder
{
    public function run(): void
    {
        RamCapacidad::upsert([
            ['nombre' => '4 GB'],
            ['nombre' => '8 GB'],
            ['nombre' => '16 GB'],
            ['nombre' => '32 GB']
        ], ['nombre'], ['nombre']);
    }
}
