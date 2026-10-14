<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\DiscoCapacidad;

class DiscoCapacidadSeeder extends Seeder
{
    public function run(): void
    {
        DiscoCapacidad::upsert([
            ['nombre' => '128 GB'],
            ['nombre' => '256 GB'],
            ['nombre' => '516 GB'],
            ['nombre' => '1 TB']
        ], ['nombre'], ['nombre']);
    }
}
