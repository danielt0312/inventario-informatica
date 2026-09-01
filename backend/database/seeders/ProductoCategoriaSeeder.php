<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

use App\Models\ProductoCategoria;
use App\Enums\ProductoCategoriaEnum;

class ProductoCategoriaSeeder extends Seeder
{
    public function run(): void
    {
        foreach (ProductoCategoriaEnum::casesToFormattedCatalog() as $case)
            ProductoCategoria::insert($case);
    }
}
