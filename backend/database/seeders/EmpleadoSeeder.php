<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use App\Models\Empleado;

class EmpleadoSeeder extends Seeder
{
    public function run(): void
    {
        for ($i=1; $i < 10; $i++) {
            Empleado::create([
                'externo_empleado_id' => $i,
                'verified_at' => now()
            ]);
        }
    }
}
