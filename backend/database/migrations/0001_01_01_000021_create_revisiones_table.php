<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('revisiones', function (Blueprint $table) {
            $table->id();
            $table->foreignId('articulo_id')
                ->constrained('articulos', indexName: 'fk_revisiones_articulos')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->unsignedBigInteger('empleado_id');
            $table->foreignId('documento_id')
                ->constrained('documentos', indexName: 'fk_revisiones_documentos')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->string('observaciones', 255)
                ->nullable();
            $table->timestamps();

            $table->unique(['articulo_id'], 'uk_revisiones');
        });

        Schema::create('revision_funcionalidades', function (Blueprint $table) {
            $table->id();
            $table->foreignId('revision_id')
                ->constrained('revisiones', indexName: 'fk_revision_funcionalidades_revisiones')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->unsignedBigInteger('empleado_id');
            $table->boolean('garantia');
            $table->boolean('monitor');
            $table->boolean('teclado');
            $table->boolean('mouse');
            $table->boolean('cable_corriente');
            $table->boolean('cable_usb');
            $table->boolean('disco_instalacion');
            $table->boolean('disco_recuperacion');
            $table->boolean('enciende');
            $table->boolean('computadora_capacidad_disco_duro');
            $table->boolean('computadora_capacidad_memoria');
            $table->boolean('computadora_cpu');
            $table->boolean('computadora_os');
            $table->boolean('impresora_laser');
            $table->boolean('impresora_inyeccion_tinta');
            $table->boolean('voz_unilinea');
            $table->boolean('voz_multilinea');
            $table->timestamps();

            $table->unique(['revision_id'], 'uk_revision_funcionalidades');
        });

        Schema::create('revision_configuraciones', function (Blueprint $table) {
            $table->id();
            $table->foreignId('revision_id')
                ->constrained('revisiones', indexName: 'fk_revision_configuraciones_revisiones')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->unsignedBigInteger('empleado_id');
            $table->boolean('garantia');
            $table->boolean('basica_equipo');
            $table->boolean('impresora');
            $table->boolean('actualizacion_os');
            $table->boolean('actualizacion_antivirus');
            $table->boolean('correo');
            $table->boolean('internet_total');
            $table->boolean('internet_restringido');
            $table->timestamps();

            $table->unique(['revision_id'], 'uk_revision_configuraciones');
        });

        Schema::create('revision_aplicaciones', function (Blueprint $table) {
            $table->id();
            $table->foreignId('revision_id')
                ->constrained('revisiones', indexName: 'fk_revision_aplicaciones_revisiones')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->unsignedBigInteger('empleado_id');
            $table->boolean('sicysa');
            $table->boolean('sacg');
            $table->timestamps();

            $table->unique(['revision_id'], 'uk_revision_aplicaciones');
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
