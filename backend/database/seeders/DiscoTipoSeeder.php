<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\DiscoTipo;

class DiscoTipoSeeder extends Seeder
{
    public function run(): void
    {
        DiscoTipo::create(['nombre' => 'HDD']);
        DiscoTipo::create(['nombre' => 'SSD']);
    }
}
