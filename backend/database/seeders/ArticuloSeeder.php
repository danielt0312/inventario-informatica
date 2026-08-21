<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use App\Models\Articulo;
use App\Enums\ArticuloEstadoEnum;
use App\Services\NumeroInventarioService;

class ArticuloSeeder extends Seeder
{
    use WithoutModelEvents;

    public function run(): void
    {
        Articulo::create([
            'producto_id' => 1,
            'estado_id' => ArticuloEstadoEnum::ACTIVO->value,
            'es_contable' => true,
            'numero_inventario' => NumeroInventarioService::generate(500,1),
        ]);

        Articulo::create([
            'producto_id' => 1,
            'estado_id' => ArticuloEstadoEnum::REVISION->value,
            'es_contable' => true,
            'numero_inventario' => NumeroInventarioService::generate(500,2),
        ]);
    }
}
