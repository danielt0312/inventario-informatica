<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

use App\Models\ProductoTipo;
use App\Enums\ProductoTipoEnum;

class ProductoTipoSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            ProductoCategoriaSeeder::class,
        ]);

        foreach (ProductoTipoEnum::cases() as $case) {
            ProductoTipo::insert([
                ...$case->toFormattedArray(),
                'categoria_id' => $case->categoria()->value
            ]);
        }
    }
}
