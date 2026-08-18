<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('dictamen_estados', function (Blueprint $table) {
            $table->id();
            $table->string('nombre', 64);
        });

        Schema::create('dictamenes', function (Blueprint $table) {
            $table->id();
            $table->uuid();
            $table->foreignId('estado_id')
                ->constrained('dictamen_estados', indexName: 'fk_dictamenes_dictamen_estados')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->foreignId('orden_compra_id')
                ->nullable()
                ->constrained('orden_compras', indexName: 'fk_dictamenes_orden_compras')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->foreignId('adscripcion_id')
                ->constrained('adscripciones', indexName: 'fk_dictamen_adscripciones')
                ->restrictOnUpdate()
                ->restrictOnDelete();
            $table->foreignId('empleado_id')
                ->constrained('empleados', indexName: 'fk_dictamenes_empleado')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->unsignedBigInteger('version_actual_id')
                ->nullable();
            $table->boolean('tiene_observaciones')
                ->nullable();
            $table->timestamps();
        });

        Schema::create('dictamen_versiones', function (Blueprint $table) {
            $table->id();
            $table->foreignId('dictamen_id')
                ->constrained('dictamenes', indexName: 'fk_dictamen_versiones_dictamenes')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->unsignedInteger('numero_version');
            $table->date('fecha_solicitud');
            $table->foreignId('oficio_id')
                ->nullable()
                ->constrained('oficios', indexName: 'fk_dictamen_versiones_oficios')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->string('motivo_cambio', 64)
                ->nullable();
            $table->foreignId('documento_id')
                ->nullable()
                ->constrained('documentos', indexName: 'fk_dictamen_versiones_documentos')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->timestamps();

            $table->unique(['dictamen_id', 'numero_version'], 'uk_dictamen_versiones');
        });

        Schema::table('dictamenes', function (Blueprint $table) {
            $table->foreign('version_actual_id', 'fk_dictamenes_dictamen_versiones')
                ->references('id')
                ->on('dictamen_versiones')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
        });

        Schema::create('dictamen_adquisiciones', function (Blueprint $table) {
            $table->id();
            $table->foreignId('dictamen_version_id')
                ->constrained('dictamen_versiones', indexName: 'fk_dictamen_adquisiciones_dictamen_versiones')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->foreignId('empleado_id')
                ->constrained('empleados', indexName: 'fk_dictamen_adquisiciones_empleados')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->foreignId('producto_tipo_id')
                ->nullable()
                ->constrained('producto_tipos', indexName: 'fk_dictamen_adquisiciones_producto_tipos')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->foreignId('producto_id')
                ->nullable()
                ->constrained('productos', indexName: 'fk_dictamen_adquisiciones_productos')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->foreignId('articulo_id')
                ->nullable()
                ->constrained('articulos', indexName: 'fk_dictamen_adquisiciones_articulos')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->unsignedTinyInteger('cantidad');
            $table->string('caracteristicas', 255)
                ->nullable();
            $table->timestamps();
        });

        Schema::table('articulos', function (Blueprint $table) {
            $table->foreign('dictamen_adquisicion_id', 'fk_articulos_dictamen_adquisiciones')
                ->references('id')
                ->on('dictamen_adquisiciones')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('dictamen_adquisiciones');
        Schema::dropIfExists('dictamen_versiones');
        Schema::dropIfExists('dictamenes');
        Schema::dropIfExists('dictamen_estados');
    }
};
