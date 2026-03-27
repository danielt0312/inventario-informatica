<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('mantenimiento_productos', function (Blueprint $table) {
            $table->id();
            $table->string('nombre', length: 32);
        });

        Schema::create('mantenimientos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('articulo_id')
                ->constrained('articulos', indexName: 'mantenimientos_articulos_fk')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->foreignId('solicitante_user_id')
                ->constrained('users', indexName: 'mantenimientos_users_fk')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->foreignId('mantenimiento_producto_id')
                ->constrained('mantenimiento_productos', indexName: 'mantenimientos_mantenimiento_productos_fk')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->date('mantenimiento');
            $table->foreignId('soporte_user_id')
                ->constrained('users', indexName: 'mantenimientos_users_fk')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->string('observaciones', length: 255);
            $table->timestamps();
        });

        Schema::create('mantenimiento_producto_otros', function (Blueprint $table) {
            $table->foreignId('mantenimiento_articulo_id')
                ->primary()
                ->constrained('mantenimientos', 'articulo_id', 'mantenimiento_producto_otros_mantenimientos_fk')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->string('nombre', length: 32);
            $table->timestamps();
        });

        Schema::create('mantenimiento_hardware_computadoras', function (Blueprint $table) {
            $table->foreignId('mantenimiento_articulo_id')
                ->primary()
                ->constrained('mantenimientos', 'articulo_id', 'mantenimiento_hardware_computadoras_mantenimientos_fk')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->tinyInteger('tarjeta_madre');
            $table->tinyInteger('disco_duro');
            $table->tinyInteger('unidad_disco');
            $table->tinyInteger('memoria_ram');
            $table->tinyInteger('fuente_poder');
            $table->tinyInteger('gabinete');
            $table->timestamps();
        });

        Schema::create('mantenimiento_hardware_impresoras', function (Blueprint $table) {
            $table->foreignId('mantenimiento_articulo_id')
                ->primary()
                ->constrained('mantenimientos', 'articulo_id', 'mantenimiento_hardware_impresoras_mantenimientos_fk')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->tinyInteger('carro');
            $table->tinyInteger('cabezal_impresion');
            $table->tinyInteger('modulo_adf');
            $table->tinyInteger('rodillos');
            $table->tinyInteger('bandeja_papel');
            $table->tinyInteger('cristal_escaneo');
            $table->tinyInteger('tarjeta_principal');
            $table->timestamps();
        });

        Schema::create('mantenimiento_hardware_perifericos', function (Blueprint $table) {
            $table->foreignId('mantenimiento_articulo_id')
                ->primary()
                ->constrained('mantenimientos', 'articulo_id', 'mantenimiento_hardware_perifericos_mantenimientos_fk')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->tinyInteger('teclados');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('revision_aplicaciones');
        Schema::dropIfExists('revision_configuraciones');
        Schema::dropIfExists('revision_funcionalidades');
        Schema::dropIfExists('revisiones');
    }
};
