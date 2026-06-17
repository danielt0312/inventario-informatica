<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Schema;

use App\Models\{Producto, ProductoMarca};
use App\Enums\ProductoTipoEnum;

class ProductoSeeder extends Seeder
{
    use WithoutModelEvents;

    public function run(): void
    {
        $this->call([
            ProductoTipoSeeder::class,
        ]);

        // todo eliminar o definir más profundamente
        ProductoMarca::insert([
            ['nombre' => 'Dell'],
            ['nombre' => 'Asus'],
            ['nombre' => 'Apple'],
        ]);

        // todo eliminar o definir más profundamente
        Producto::insert([
            ['tipo_id' => ProductoTipoEnum::COMPUTADORA_ESCRITORIO->value, 'marca_id' => 1, 'nombre' => 'Optiplex 3070'],
            ['tipo_id' => ProductoTipoEnum::COMPUTADORA_ESCRITORIO->value, 'marca_id' => 1, 'nombre' => 'Optiplex 9020'],
            ['tipo_id' => ProductoTipoEnum::COMPUTADORA_PORTATIL->value, 'marca_id' => 1, 'nombre' => 'Inspiron 3800'],
            ['tipo_id' => ProductoTipoEnum::COMPUTADORA_PORTATIL->value, 'marca_id' => 1, 'nombre' => 'Inspiron 5070'],
            ['tipo_id' => ProductoTipoEnum::COMPUTADORA_PORTATIL->value, 'marca_id' => 2, 'nombre' => 'Vivobook 14'],
            ['tipo_id' => ProductoTipoEnum::COMPUTADORA_PORTATIL->value, 'marca_id' => 2, 'nombre' => 'Vivobook 15']
        ]);
    }
}
