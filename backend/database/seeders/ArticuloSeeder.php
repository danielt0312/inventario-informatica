<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use App\Models\Articulo;
use App\Enums\{
    ArticuloEstadoEnum,
    ClasificadorEnum
};
use App\Services\NumeroInventarioService;

class ArticuloSeeder extends Seeder
{
    use WithoutModelEvents;

    public function run(): void
    {
        Articulo::create([
            'producto_id' => 1,
            'estado_id' => ArticuloEstadoEnum::ACTIVO->value,
            'es_inventariable' => true,
            'numero_inventario' => NumeroInventarioService::generate(ClasificadorEnum::COMPUTO_TECNOLOGIA_INFORMACION, 1),
        ]);

        Articulo::create([
            'producto_id' => 1,
            'estado_id' => ArticuloEstadoEnum::ACTIVO->value,
            'es_inventariable' => true,
            'numero_inventario' => NumeroInventarioService::generate(ClasificadorEnum::COMPUTO_TECNOLOGIA_INFORMACION, 2),
        ]);
    }
}
