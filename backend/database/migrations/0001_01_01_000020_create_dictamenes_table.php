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
            $table->foreignId('user_id')
                ->constrained('users', indexName: 'fk_dictamenes_users')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
        });

        Schema::create('dictamen_versiones', function (Blueprint $table) {
            $table->id();
            $table->foreignId('dictamen_id')
                ->constrained('dictamenes', indexName: 'fk_dictamen_versiones_dictamenes')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->unsignedInteger('version');
            $table->date('fecha_solicitud');
            $table->foreignId('oficio_id')
                ->nullable()
                ->constrained('oficios', indexName: 'fk_dictamen_versiones_oficios')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->foreignId('documento_id')
                ->nullable()
                ->constrained('documentos', indexName: 'fk_dictamen_versiones_documentos')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->foreignId('adscripcion_id')
                ->constrained('adscripciones', indexName: 'fk_dictamen_versiones_adscripciones')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->timestamps();

            $table->unique(['dictamen_id', 'version'], 'uk_dictamen_versiones');
        });

        Schema::table('dictamenes', function (Blueprint $table) {
            $table->foreignId('version_actual_id')
                ->nullable()
                ->constrained('dictamen_versiones', indexName: 'fk_dictamenes_dictamen_versiones')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->timestamps();
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

        Schema::create('dictamen_articulos', function (Blueprint $table) {
            $table->foreignId('articulo_id')
                ->primary()
                ->constrained('articulos', indexName: 'fk_dictamen_articulos_articulos')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->foreignId('dictamen_id')
                ->constrained('dictamenes', indexName: 'fk_dictamen_articulos_dictamenes')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('dictamen_articulos');
        Schema::dropIfExists('dictamen_adquisiciones');
        Schema::dropIfExists('dictamen_versiones');
        Schema::dropIfExists('dictamenes');
        Schema::dropIfExists('dictamen_estados');
    }
};
