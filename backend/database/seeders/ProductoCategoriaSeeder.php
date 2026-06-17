<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

use App\Models\ProductoCategoria;
use App\Enums\ProductoCategoriaEnum;

class ProductoCategoriaSeeder extends Seeder
{
    public function run(): void
    {
        foreach (ProductoCategoriaEnum::casesToFormattedArray() as $data) {
            ProductoCategoria::insert($data);
        }
    }
}
