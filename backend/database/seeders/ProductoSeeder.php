<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use App\Models\{Producto, ProductoMarca};

class ProductoSeeder extends Seeder
{
    use WithoutModelEvents;

    public function run(): void
    {
        $this->call([
            ProductoTipoSeeder::class,
        ]);

        ProductoMarca::insertOrIgnore([
            ['nombre' => 'Dell'],
            ['nombre' => 'Asus'],
            ['nombre' => 'Apple'],
        ]);

        Producto::insertOrIgnore([
            ['producto_tipo_id' => 1, 'producto_marca_id' => 1, 'nombre' => 'Optiplex 3070'],
            ['producto_tipo_id' => 1, 'producto_marca_id' => 1, 'nombre' => 'Optiplex 9020'],
            ['producto_tipo_id' => 2, 'producto_marca_id' => 1, 'nombre' => 'Inspiron 3800'],
            ['producto_tipo_id' => 2, 'producto_marca_id' => 1, 'nombre' => 'Inspiron 5070'],
            ['producto_tipo_id' => 2, 'producto_marca_id' => 2, 'nombre' => 'Vivobook 14'],
            ['producto_tipo_id' => 2, 'producto_marca_id' => 2, 'nombre' => 'Vivobook 15'],
        ]);
    }
}
