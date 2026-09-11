<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\DiscoInterfaz;

class DiscoInterfazSeeder extends Seeder
{
    public function run(): void
    {
        DiscoInterfaz::create(['nombre' => 'SATA I']);
        DiscoInterfaz::create(['nombre' => 'SATA II']);
        DiscoInterfaz::create(['nombre' => 'SATA III']);
        DiscoInterfaz::create(['nombre' => 'SATA M.2']);
        DiscoInterfaz::create(['nombre' => 'NVMe M.2']);
    }
}
