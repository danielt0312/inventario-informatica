<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use App\Models\ResguardoEstado;
use App\Enums\ResguardoEstadoEnum;

class ResguardoEstadoSeeder extends Seeder
{
    public function run(): void
    {
        ResguardoEstado::upsert(
            ResguardoEstadoEnum::casesToFormattedCatalog(),
            ['nombre'],
            ['nombre']
        );
    }
}
