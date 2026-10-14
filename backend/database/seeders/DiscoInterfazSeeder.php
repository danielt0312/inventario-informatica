<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\DiscoInterfaz;

class DiscoInterfazSeeder extends Seeder
{
    public function run(): void
    {
        DiscoInterfaz::upsert([
            ['nombre' => 'SATA I'],
            ['nombre' => 'SATA II'],
            ['nombre' => 'SATA III'],
            ['nombre' => 'SATA'],
            ['nombre' => 'NVMe']
        ], ['nombre'], ['nombre']);
    }
}
