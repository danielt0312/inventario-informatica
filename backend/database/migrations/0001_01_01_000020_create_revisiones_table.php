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
                ->constrained('articulos', indexName: 'fk_revisiones_articulos')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->foreignId('user_id')
                ->constrained('users', indexName: 'fk_revisiones_users')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->foreignId('documento_id')
                ->nullable()
                ->constrained('documentos', indexName: 'fk_revisiones_documentos')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->string('observaciones', 255)
                ->nullable();
            $table->timestamps();
        });

        Schema::create('revision_funcionalidades', function (Blueprint $table) {
            $table->foreignId('revision_id')
                ->primary()
                ->constrained('revisiones', 'articulo_id','fk_revision_funcionalidades_revisiones')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->foreignId('user_id')
                ->constrained('users', indexName: 'fk_revision_funcionalidades_users')
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
            $table->foreignId('revision_id')
                ->primary()
                ->constrained('revisiones', 'articulo_id', 'fk_revision_configuraciones_revisiones')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->foreignId('user_id')
                ->constrained('users', indexName: 'fk_revision_configuraciones_users')
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
            $table->foreignId('revision_id')
                ->primary()
                ->constrained('revisiones', 'articulo_id', 'fk_revision_aplicaciones_revisiones')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->foreignId('user_id')
                ->constrained('users', indexName: 'fk_revision_aplicaciones_users')
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
