<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\DiscoCapacidad;

class DiscoCapacidadSeeder extends Seeder
{
    public function run(): void
    {
        DiscoCapacidad::create(['nombre' => '128 GB']);
        DiscoCapacidad::create(['nombre' => '256 GB']);
        DiscoCapacidad::create(['nombre' => '516 GB']);
        DiscoCapacidad::create(['nombre' => '1 TB']);
    }
}
