<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('revisiones', function (Blueprint $table) {
            $table->foreignId('articulo_id')
                ->primary()
                ->constrained('articulos', indexName: 'revisiones_articulos_fk')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->foreignId('user_id')
                ->constrained('users', indexName: 'revisiones_users_fk')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->foreignId('documento_id')
                ->constrained('documentos', indexName: 'revisiones_documentos_fk')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->string('observaciones', length: 255);
            $table->timestamps();
        });

        Schema::create('revision_funcionalidades', function (Blueprint $table) {
            $table->foreignId('revision_articulo_id')
                ->primary()
                ->constrained('revisiones', 'articulo_id','revision_funcionalidades_revisiones_fk')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->foreignId('user_id')
                ->constrained('users', indexName: 'revision_funcionalidades_users_fk')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->tinyInteger('garantia');
            $table->tinyInteger('monitor');
            $table->tinyInteger('teclado');
            $table->tinyInteger('mouse');
            $table->tinyInteger('cable_corriente');
            $table->tinyInteger('cable_usb');
            $table->tinyInteger('disco_instalacion');
            $table->tinyInteger('disco_recuperacion');
            $table->tinyInteger('enciende');
            $table->tinyInteger('computadora_capacidad_disco_duro');
            $table->tinyInteger('computadora_capacidad_memoria');
            $table->tinyInteger('computadora_cpu');
            $table->tinyInteger('computadora_os');
            $table->tinyInteger('impresora_laser');
            $table->tinyInteger('impresora_inyeccion_tinta');
            $table->tinyInteger('voz_unilinea');
            $table->tinyInteger('voz_multilinea');
            $table->timestamps();
        });

        Schema::create('revision_configuraciones', function (Blueprint $table) {
            $table->foreignId('revision_articulo_id')
                ->primary()
                ->constrained('revisiones', 'articulo_id', 'revision_configuraciones_revisiones_fk')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->foreignId('user_id')
                ->constrained('users', indexName: 'revision_configuraciones_users_fk')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->tinyInteger('garantia');
            $table->tinyInteger('basica_equipo');
            $table->tinyInteger('impresora');
            $table->tinyInteger('actualizacion_os');
            $table->tinyInteger('actualizacion_antivirus');
            $table->tinyInteger('correo');
            $table->tinyInteger('internet_total');
            $table->tinyInteger('internet_restringido');
            $table->timestamps();
        });

        Schema::create('revision_aplicaciones', function (Blueprint $table) {
            $table->foreignId('revision_articulo_id')
                ->primary()
                ->constrained('revisiones', 'articulo_id', 'revision_aplicaciones_revisiones_fk')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->foreignId('user_id')
                ->constrained('users', indexName: 'revision_aplicaciones_users_fk')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->tinyInteger('sicysa');
            $table->tinyInteger('sacg');
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
