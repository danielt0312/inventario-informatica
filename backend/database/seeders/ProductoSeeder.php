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
            ['tipo_id' => ProductoTipoEnum::COMPUTADORA_ESCRITORIO->value, 'marca_id' => 1, 'modelo' => 'Optiplex 3070'],
            ['tipo_id' => ProductoTipoEnum::COMPUTADORA_ESCRITORIO->value, 'marca_id' => 1, 'modelo' => 'Optiplex 9020'],
            ['tipo_id' => ProductoTipoEnum::COMPUTADORA_PORTATIL->value, 'marca_id' => 1, 'modelo' => 'Inspiron 3800'],
            ['tipo_id' => ProductoTipoEnum::COMPUTADORA_PORTATIL->value, 'marca_id' => 1, 'modelo' => 'Inspiron 5070'],
            ['tipo_id' => ProductoTipoEnum::COMPUTADORA_PORTATIL->value, 'marca_id' => 2, 'modelo' => 'Vivobook 14'],
            ['tipo_id' => ProductoTipoEnum::COMPUTADORA_PORTATIL->value, 'marca_id' => 2, 'modelo' => 'Vivobook 15'],
            ['tipo_id' => ProductoTipoEnum::TECLADO->value, 'marca_id' => 1, 'modelo' => 'KB216-BK-LTN'],
        ]);
    }
}
