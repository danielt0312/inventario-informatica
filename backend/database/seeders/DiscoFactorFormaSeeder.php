<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\DiscoFactorForma;

class DiscoFactorFormaSeeder extends Seeder
{
    public function run(): void
    {
        DiscoFactorForma::upsert([
            ['nombre' => '2.5"'],
            ['nombre' => 'M.2 2280'],
            ['nombre' => 'M.2 2230']
        ], ['nombre'], ['nombre']);
    }
}
