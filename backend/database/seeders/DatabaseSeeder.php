<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

use App\Models\{Product, ProductType};

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        // User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@asetamaulipas.gob.mx',
        //     'password' => '12345678',
        // ]);

        DB::statement('SET FOREIGN_KEY_CHECKS=0;');

        ProductType::insert([
            ['name' => 'Computadora'],
            ['name' => 'Dispositivo de Almacenamiento'],
            ['name' => 'Telefonía'],
            ['name' => 'Redes'],
            ['name' => 'Refacción'],
            ['name' => 'Herramienta'],
            ['name' => 'Audio'],
            ['name' => 'Cámara y Video'],
            ['name' => 'Proyección'],
            ['name' => 'Impresora'],
            ['name' => 'Periférico'],
            ['name' => 'Eléctrico'],
            ['name' => 'Escáner']
        ]);

        Product::insert([
            ['product_type_id'=> 1, 'name' => 'Desktop'],
            ['product_type_id'=> 1, 'name' => 'Laptop'],
            ['product_type_id'=> 1, 'name' => 'Servidor'],
            ['product_type_id'=> 1, 'name' => 'Tablet'],
            ['product_type_id'=> 2, 'name' => 'Disco'],
            ['product_type_id'=> 3, 'name' => 'Telefono'],
            ['product_type_id'=> 4, 'name' => 'Access Point'],
            ['product_type_id'=> 4, 'name' => 'Antena'],
            ['product_type_id'=> 5, 'name' => 'Firewall'],
            ['product_type_id'=> 5, 'name' => 'Módem'],
            ['product_type_id'=> 5, 'name' => 'Panel de Parcheo de 24 Puertos'],
            ['product_type_id'=> 5, 'name' => 'Panel de Parcheo de 48 Puertos'],
            ['product_type_id'=> 5, 'name' => 'Rack'],
            ['product_type_id'=> 6, 'name' => 'Router'],
            ['product_type_id'=> 6, 'name' => 'Switch'],
            ['product_type_id'=> 7, 'name' => 'Adaptador '],
            ['product_type_id'=> 7, 'name' => 'Módulo de Receptor'],
            ['product_type_id'=> 7, 'name' => 'Apuntador Óptico'],
            ['product_type_id'=> 7, 'name' => 'Caja de Conectividad'],
            ['product_type_id'=> 7, 'name' => 'Lector de Código de Barras'],
            ['product_type_id'=> 7, 'name' => 'Reloj Checador'],
            ['product_type_id'=> 7, 'name' => 'Reloj Checador Biométrico'],
            ['product_type_id'=> 8, 'name' => 'Bocina'],
            ['product_type_id'=> 8, 'name' => 'Bocina Ambiental'],
            ['product_type_id'=> 8, 'name' => 'Consola'],
            ['product_type_id'=> 8, 'name' => 'Micrófono'],
            ['product_type_id'=> 9, 'name' => 'Cámara de Video Digital'],
            ['product_type_id'=> 9, 'name' => 'Cámara Fotográfica Digital'],
            ['product_type_id'=> 9, 'name' => 'Cámara Web'],
            ['product_type_id'=> 10, 'name' => 'Concentrador'],
            ['product_type_id'=> 10, 'name' => 'Pantalla Retractil'],
            ['product_type_id'=> 10, 'name' => 'Proyector'],
            ['product_type_id'=> 10, 'name' => 'Unidad de Video'],
            ['product_type_id'=> 11, 'name' => 'Impresora'],
            ['product_type_id'=> 11, 'name' => 'Impresora Multifuncional'],
            ['product_type_id'=> 11, 'name' => 'Plotter'],
            ['product_type_id'=> 12, 'name' => 'Monitor'],
            ['product_type_id'=> 12, 'name' => 'Quemador DVD Externo'],
            ['product_type_id'=> 12, 'name' => 'Unidad DVD-RW USB Externa'],
            ['product_type_id'=> 12, 'name' => 'Teclado'],
            ['product_type_id'=> 12, 'name' => 'Mouse'],
            ['product_type_id'=> 13, 'name' => 'Módulo de Baterías Externas'],
            ['product_type_id'=> 13, 'name' => 'UPS'],
            ['product_type_id'=> 14, 'name' => 'Escáner']
        ]);

        ProductBrand::insert([
            ['name' => 'Dell'],
            ['name' => 'ASUS'],
            ['name' => 'Intel']
        ]);

        ProductModel::insert([
            ['product_id' => 1, 'product_brand_id' => 1, 'name' => 'Optiplex 3070'],
            ['product_id' => 1, 'product_brand_id' => 1, 'name' => 'Optiplex 9020'],
            ['product_id' => 2, 'product_brand_id' => 1, 'name' => 'Inspiron 3800'],
            ['product_id' => 2, 'product_brand_id' => 1, 'name' => 'Inspiron 5070'],
            ['product_id' => 2, 'product_brand_id' => 2, 'name' => 'Vivobook 14'],
            ['product_id' => 2, 'product_brand_id' => 2, 'name' => 'Vivobook 14'],
        ]);
    }
}
