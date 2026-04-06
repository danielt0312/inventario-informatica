<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use App\Models\ProductoTipo;

class ProductoTipoSeeder extends Seeder
{
    use WithoutModelEvents;

    public function run(): void
    {
        $this->call([
            ProductoCategoriaSeeder::class,
        ]);

        ProductoTipo::insertOrIgnore([
            ['producto_categoria_id' => 1, 'nombre' => 'Computadora de Escritorio'],
            ['producto_categoria_id' => 1, 'nombre' => 'Computadora portátil'],
            ['producto_categoria_id' => 1, 'nombre' => 'Servidor'],
            ['producto_categoria_id' => 1, 'nombre' => 'Tablet'],
            ['producto_categoria_id' => 2, 'nombre' => 'Disco'],
            ['producto_categoria_id' => 3, 'nombre' => 'Teléfono'],
            ['producto_categoria_id' => 4, 'nombre' => 'Access Point'],
            ['producto_categoria_id' => 4, 'nombre' => 'Antena'],
            ['producto_categoria_id' => 5, 'nombre' => 'Firewall'],
            ['producto_categoria_id' => 5, 'nombre' => 'Módem'],
            ['producto_categoria_id' => 5, 'nombre' => 'Pánel de Parcheo'],
            ['producto_categoria_id' => 5, 'nombre' => 'Rack'],
            ['producto_categoria_id' => 6, 'nombre' => 'Router'],
            ['producto_categoria_id' => 6, 'nombre' => 'Switch'],
            ['producto_categoria_id' => 7, 'nombre' => 'Adaptador'],
            ['producto_categoria_id' => 7, 'nombre' => 'Módulo de Receptor'],
            ['producto_categoria_id' => 7, 'nombre' => 'Apuntador Óptico'],
            ['producto_categoria_id' => 7, 'nombre' => 'Caja de Conectividad'],
            ['producto_categoria_id' => 7, 'nombre' => 'Lector de Código de Barras'],
            ['producto_categoria_id' => 7, 'nombre' => 'Reloj Checador'],
            ['producto_categoria_id' => 7, 'nombre' => 'Reloj Checador Biométrico'],
            ['producto_categoria_id' => 8, 'nombre' => 'Bocina'],
            ['producto_categoria_id' => 8, 'nombre' => 'Bocina Ambiental'],
            ['producto_categoria_id' => 8, 'nombre' => 'Consola'],
            ['producto_categoria_id' => 8, 'nombre' => 'Micrófono'],
            ['producto_categoria_id' => 9, 'nombre' => 'Cámara de Video Digital'],
            ['producto_categoria_id' => 9, 'nombre' => 'Cámara Fotográfica Digital'],
            ['producto_categoria_id' => 9, 'nombre' => 'Cámara Web'],
            ['producto_categoria_id' => 10, 'nombre' => 'Concentrador'],
            ['producto_categoria_id' => 10, 'nombre' => 'Pantalla Retractil'],
            ['producto_categoria_id' => 10, 'nombre' => 'Proyector'],
            ['producto_categoria_id' => 10, 'nombre' => 'Unidad de Video'],
            ['producto_categoria_id' => 11, 'nombre' => 'Impresora'],
            ['producto_categoria_id' => 11, 'nombre' => 'Impresora Multifuncional'],
            ['producto_categoria_id' => 11, 'nombre' => 'Plotter'],
            ['producto_categoria_id' => 12, 'nombre' => 'Monitor'],
            ['producto_categoria_id' => 12, 'nombre' => 'Quemador DVD Externo'],
            ['producto_categoria_id' => 12, 'nombre' => 'Unidad DVD-RW USB Externa'],
            ['producto_categoria_id' => 12, 'nombre' => 'Teclado'],
            ['producto_categoria_id' => 12, 'nombre' => 'Mouse'],
            ['producto_categoria_id' => 13, 'nombre' => 'Módulo de Baterías Externas'],
            ['producto_categoria_id' => 13, 'nombre' => 'UPS'],
            ['producto_categoria_id' => 14, 'nombre' => 'Escáner'],
            ['producto_categoria_id' => 15, 'nombre' => 'RAM'],
        ]);
    }
}
