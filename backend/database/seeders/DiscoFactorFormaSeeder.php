<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\DiscoFactorForma;

class DiscoFactorFormaSeeder extends Seeder
{
    public function run(): void
    {
        DiscoFactorForma::create(['nombre' => '2.5"']);
        DiscoFactorForma::create(['nombre' => 'M.2 2280']);
        DiscoFactorForma::create(['nombre' => 'M.2 2230']);
    }
}
