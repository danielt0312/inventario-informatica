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
            $table->string('nombre', 32);
        });

        Schema::create('mantenimientos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('articulo_id')
                ->constrained('articulos', indexName: 'fk_mantenimientos_articulos')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->foreignId('resguardante_user_id')
                ->constrained('users', indexName: 'fk_mantenimientos_users_resguardante')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->foreignId('producto_id')
                ->constrained('mantenimiento_productos', indexName: 'fk_mantenimientos_mantenimiento_productos')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->date('fecha_realizacion');
            $table->foreignId('soporte_user_id')
                ->constrained('users', indexName: 'fk_mantenimientos_users_soporte')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->string('observaciones', 255)
                ->nullable();
            $table->timestamps();
        });

        Schema::create('mantenimiento_producto_otros', function (Blueprint $table) {
            $table->foreignId('mantenimiento_id')
                ->primary()
                ->constrained('mantenimientos', indexName: 'fk_mantenimiento_producto_otros_mantenimientos')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->string('nombre', 32);
            $table->timestamps();
        });

        Schema::create('mantenimiento_computadoras', function (Blueprint $table) {
            $table->foreignId('mantenimiento_id')
                ->primary()
                ->constrained('mantenimientos', indexName: 'fk_mantenimiento_computadoras_mantenimientos')
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

        Schema::create('mantenimiento_impresoras', function (Blueprint $table) {
            $table->foreignId('mantenimiento_id')
                ->primary()
                ->constrained('mantenimientos', indexName: 'fk_mantenimiento_impresoras_mantenimientos')
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

        Schema::create('mantenimiento_perifericos', function (Blueprint $table) {
            $table->foreignId('mantenimiento_id')
                ->primary()
                ->constrained('mantenimientos', indexName: 'fk_mantenimiento_perifericos_mantenimientos')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->tinyInteger('teclado');
            $table->tinyInteger('mouse');
            $table->tinyInteger('monitor');
            $table->tinyInteger('eliminador_corriente');
            $table->tinyInteger('bateria');
            $table->tinyInteger('carcaza_exterior');
            $table->tinyInteger('otro');
            $table->timestamps();
        });

        Schema::create('mantenimiento_periferico_otros', function (Blueprint $table) {
            $table->foreignId('mantenimiento_id')
                ->primary()
                ->constrained('mantenimiento_perifericos', 'mantenimiento_id', 'fk_mantenimiento_periferico_otros_mantenimiento_perifericos')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->string('nombre', 32);
            $table->timestamps();
        });

        Schema::create('mantenimiento_os', function (Blueprint $table) {
            $table->foreignId('mantenimiento_id')
                ->primary()
                ->constrained('mantenimientos', indexName: 'fk_mantenimiento_os_mantenimientos')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->tinyInteger('actualizaciones');
            $table->tinyInteger('defrag_disco');
            $table->tinyInteger('liberador_espacio');
            $table->timestamps();
        });

        Schema::create('mantenimiento_archivos', function (Blueprint $table) {
            $table->foreignId('mantenimiento_id')
                ->primary()
                ->constrained('mantenimientos', indexName: 'fk_mantenimiento_archivos_mantenimientos')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->tinyInteger('depuracion_programas');
            $table->tinyInteger('eliminacion_cookies');
            $table->tinyInteger('papeleria_reciclaje');
            $table->tinyInteger('respaldo');
            $table->tinyInteger('pst');
            $table->timestamps();
        });

        Schema::create('mantenimiento_archivo_pst', function (Blueprint $table) {
            $table->foreignId('mantenimiento_id')
                ->primary()
                ->constrained('mantenimiento_archivos', 'mantenimiento_id', 'fk_mantenimiento_archivo_pst_mantenimiento_archivos')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->string('nombre', 32);
            $table->timestamps();
        });

        Schema::create('mantenimiento_aplicaciones', function (Blueprint $table) {
            $table->foreignId('mantenimiento_id')
                ->primary()
                ->constrained('mantenimientos', indexName: 'fk_mantenimiento_aplicaciones_mantenimientos')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->boolean('antivirus');
            $table->boolean('office');
            $table->boolean('adobe');
            $table->boolean('navegadores_web');
            $table->boolean('syncback');
            $table->boolean('otro');
            $table->timestamps();
        });

        Schema::create('mantenimiento_aplicacion_otros', function (Blueprint $table) {
            $table->foreignId('mantenimiento_id')
                ->primary()
                ->constrained('mantenimiento_aplicaciones', 'mantenimiento_id', 'fk_mantenimiento_aplicacion_otros_mantenimiento_aplicaciones')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->string('nombre', 32);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('mantenimiento_aplicacion_otros');
        Schema::dropIfExists('mantenimiento_aplicaciones');
        Schema::dropIfExists('mantenimiento_archivo_pst');
        Schema::dropIfExists('mantenimiento_archivos');
        Schema::dropIfExists('mantenimiento_os');
        Schema::dropIfExists('mantenimiento_periferico_otros');
        Schema::dropIfExists('mantenimiento_perifericos');
        Schema::dropIfExists('mantenimiento_impresoras');
        Schema::dropIfExists('mantenimiento_computadoras');
        Schema::dropIfExists('mantenimiento_producto_otros');
        Schema::dropIfExists('mantenimientos');
        Schema::dropIfExists('mantenimiento_productos');
    }
};
