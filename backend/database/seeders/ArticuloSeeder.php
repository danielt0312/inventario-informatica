<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use App\Models\{
    Articulo,
    ProductoVariante,
    Computadora
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
        Computadora::upsert([
            'tipo_id' => ComputadoraTipoEnum::Escritorio->value
        ], ['id' => 1]);

        ProductoVariante::upsert([
            'producto_id' => 1,
            'variante_type' => ProductoTipoEnum::Computadora->varianteMorphAlias(),
            'variante_id' => 1,
        ], [
            'variante_type' => ProductoTipoEnum::Computadora->varianteMorphAlias(),
            'variante_id' => 1,
        ]);

        Articulo::create([
            'producto_variante_id' => 1,
            'estado_id' => ArticuloEstadoEnum::Activo->value,
            'es_inventariable' => true,
            'numero_inventario' => NumeroInventarioService::generate(ClasificadorEnum::ComputoTecnologiaInformacion, 1),
        ]);
    }
}
