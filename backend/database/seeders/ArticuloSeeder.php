<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use App\Models\{
    Articulo,
    ProductoVariante,
    Computadora,
    ArticuloComputadora,
    Procesador
};
use App\Enums\{
    ArticuloEstadoEnum,
    ClasificadorEnum,
    ComputadoraTipoEnum,
    ProductoTipoEnum
};
use App\Services\NumeroInventarioService;

class ArticuloSeeder extends Seeder
{
    use WithoutModelEvents;

    public function run(): void
    {
        Procesador::upsert([], ['id']);

        ProductoVariante::upsert([
            'producto_id' => 1,
            'variante_id' => 1,
            'variante_type' => ProductoTipoEnum::Computadora->varianteMorphAlias(),
        ], ['variante_id', 'variante_type']);

        Computadora::upsert([
            'tipo_id' => ComputadoraTipoEnum::Escritorio->value
        ], ['id']);

        Articulo::upsert([
            'producto_variante_id' => 1,
            'estado_id' => ArticuloEstadoEnum::Activo->value,
            'numero_inventario' => NumeroInventarioService::generate(ClasificadorEnum::ComputoTecnologiaInformacion, 1),
        ], ['numero_inventario']);

        ArticuloComputadora::upsert([
            'articulo_id' => 1,
            'procesador_id' => 1
        ], ['id']);
    }
}
