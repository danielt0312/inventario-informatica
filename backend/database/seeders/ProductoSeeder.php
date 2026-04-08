<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Schema;

use App\Models\{Producto, ProductoMarca};

class ProductoSeeder extends Seeder
{
    use WithoutModelEvents;

    public function run(): void
    {
        Schema::disableForeignKeyConstraints();

        $this->call([
            ProductoTipoSeeder::class,
        ]);

        ProductoMarca::insertOrIgnore([
            ['nombre' => 'Dell'],
            ['nombre' => 'Asus'],
            ['nombre' => 'Apple'],
        ]);

        Producto::insertOrIgnore([
            ['tipo_id' => 1, 'marca_id' => 1, 'nombre' => 'Optiplex 3070'],
            ['tipo_id' => 1, 'marca_id' => 1, 'nombre' => 'Optiplex 9020'],
            ['tipo_id' => 2, 'marca_id' => 1, 'nombre' => 'Inspiron 3800'],
            ['tipo_id' => 2, 'marca_id' => 1, 'nombre' => 'Inspiron 5070'],
            ['tipo_id' => 2, 'marca_id' => 2, 'nombre' => 'Vivobook 14'],
            ['tipo_id' => 2, 'marca_id' => 2, 'nombre' => 'Vivobook 15'],
        ]);

        Schema::enableForeignKeyConstraints();
    }
}
