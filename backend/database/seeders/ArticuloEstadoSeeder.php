<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use App\Models\ArticuloEstado;
use App\Enums\ArticuloEstadoEnum;

class ArticuloEstadoSeeder extends Seeder
{
    public function run(): void
    {
        ArticuloEstado::upsert(
            ArticuloEstadoEnum::casesToFormattedCatalog(),
            ['id'],
            ['nombre']
        );

        foreach (ArticuloEstadoEnum::casesToFormattedCatalog() as $case) {
            ArticuloEstado::insertOrIgnore($case);
        }
    }
}
