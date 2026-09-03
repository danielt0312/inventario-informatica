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
            $table->foreignId('oficio_id')
                ->unique('uk_dictamenes_oficio')
                ->constrained('oficios', indexName: 'fk_dictamen_versiones_oficios')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->foreignId('orden_compra_id')
                ->nullable()
                ->constrained('orden_compras', indexName: 'fk_dictamenes_orden_compras')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->unsignedBigInteger('adscripcion_id'); // todo cambiar por definicion real
            $table->unsignedBigInteger('empleado_id'); // todo cambiar por definicion real
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
            $table->string('motivo_cambio', 64)
                ->nullable();
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
            $table->unsignedBigInteger('empleado_id'); // todo cambiar por definicion real
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
            $table->string('especificaciones_tecnicas', 255)
                ->nullable();
            $table->timestamps();
        });

        Schema::create('dictamen_adquisicion_articulos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('articulo_id')
                ->constrained('articulos', indexName: 'fk_dictamen_adquisicion_articulos_articulos')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->foreignId('dictamen_adquisicion_id')
                ->constrained('dictamen_adquisiciones', indexName: 'fk_dictamen_adquisicion_articulos_dictamen_adquisiciones')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->timestamps();

            $table->unique(['articulo_id'], 'uk_dictamen_adquisicion_articulos');
        });

        Schema::table('articulos', function (Blueprint $table) {
            $table->foreign('dictamen_id', 'fk_articulos_dictamenes')
                ->references('id')
                ->on('dictamenes')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('dictamen_adquisicion_articulos');
        Schema::dropIfExists('dictamen_adquisiciones');
        Schema::dropIfExists('dictamen_versiones');
        Schema::dropIfExists('dictamenes');
        Schema::dropIfExists('dictamen_estados');
    }
};
