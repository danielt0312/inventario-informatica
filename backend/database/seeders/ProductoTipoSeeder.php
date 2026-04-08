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
            ['categoria_id' => 1, 'nombre' => 'Computadora de Escritorio'],
            ['categoria_id' => 1, 'nombre' => 'Computadora portátil'],
            ['categoria_id' => 1, 'nombre' => 'Servidor'],
            ['categoria_id' => 1, 'nombre' => 'Tablet'],
            ['categoria_id' => 2, 'nombre' => 'Disco'],
            ['categoria_id' => 3, 'nombre' => 'Teléfono'],
            ['categoria_id' => 4, 'nombre' => 'Access Point'],
            ['categoria_id' => 4, 'nombre' => 'Antena'],
            ['categoria_id' => 5, 'nombre' => 'Firewall'],
            ['categoria_id' => 5, 'nombre' => 'Módem'],
            ['categoria_id' => 5, 'nombre' => 'Pánel de Parcheo'],
            ['categoria_id' => 5, 'nombre' => 'Rack'],
            ['categoria_id' => 6, 'nombre' => 'Router'],
            ['categoria_id' => 6, 'nombre' => 'Switch'],
            ['categoria_id' => 7, 'nombre' => 'Adaptador'],
            ['categoria_id' => 7, 'nombre' => 'Módulo de Receptor'],
            ['categoria_id' => 7, 'nombre' => 'Apuntador Óptico'],
            ['categoria_id' => 7, 'nombre' => 'Caja de Conectividad'],
            ['categoria_id' => 7, 'nombre' => 'Lector de Código de Barras'],
            ['categoria_id' => 7, 'nombre' => 'Reloj Checador'],
            ['categoria_id' => 7, 'nombre' => 'Reloj Checador Biométrico'],
            ['categoria_id' => 8, 'nombre' => 'Bocina'],
            ['categoria_id' => 8, 'nombre' => 'Bocina Ambiental'],
            ['categoria_id' => 8, 'nombre' => 'Consola'],
            ['categoria_id' => 8, 'nombre' => 'Micrófono'],
            ['categoria_id' => 9, 'nombre' => 'Cámara de Video Digital'],
            ['categoria_id' => 9, 'nombre' => 'Cámara Fotográfica Digital'],
            ['categoria_id' => 9, 'nombre' => 'Cámara Web'],
            ['categoria_id' => 10, 'nombre' => 'Concentrador'],
            ['categoria_id' => 10, 'nombre' => 'Pantalla Retractil'],
            ['categoria_id' => 10, 'nombre' => 'Proyector'],
            ['categoria_id' => 10, 'nombre' => 'Unidad de Video'],
            ['categoria_id' => 11, 'nombre' => 'Impresora'],
            ['categoria_id' => 11, 'nombre' => 'Impresora Multifuncional'],
            ['categoria_id' => 11, 'nombre' => 'Plotter'],
            ['categoria_id' => 12, 'nombre' => 'Monitor'],
            ['categoria_id' => 12, 'nombre' => 'Quemador DVD Externo'],
            ['categoria_id' => 12, 'nombre' => 'Unidad DVD-RW USB Externa'],
            ['categoria_id' => 12, 'nombre' => 'Teclado'],
            ['categoria_id' => 12, 'nombre' => 'Mouse'],
            ['categoria_id' => 13, 'nombre' => 'Módulo de Baterías Externas'],
            ['categoria_id' => 13, 'nombre' => 'UPS'],
            ['categoria_id' => 14, 'nombre' => 'Escáner'],
            ['categoria_id' => 15, 'nombre' => 'RAM'],
        ]);
    }
}
