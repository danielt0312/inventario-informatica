<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use App\Models\Adscripcion;

class AdscripcionSeeder extends Seeder
{
    public function run(): void
    {
        for ($i=1; $i < 10; $i++) {
            Adscripcion::create([
                'externo_adscripcion_id' => $i,
                'verified_at' => now()
            ]);
        }
    }
}
