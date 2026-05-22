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
            $table->foreignId('estado_id')
                ->constrained('dictamen_estados', indexName: 'fk_dictamenes_dictamen_estados')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->foreignId('oficio_id')
                ->constrained('oficios', indexName: 'fk_dictamenes_oficios')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->foreignId('documento_id')
                ->nullable()
                ->constrained('documentos', indexName: 'fk_dictamenes_documentos')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->foreignId('adscripcion_id')
                ->constrained('adscripciones', indexName: 'fk_dictamenes_adscripciones')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->foreignId('users_id')
                ->constrained('users', indexName: 'fk_dictamenes_users')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->date('fecha_solicitud');
            $table->boolean('activo');
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('dictamen_productos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('dictamen_id')
                ->constrained('dictamenes', indexName: 'fk_dictamen_productos_dictamenes')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->foreignId('empleado_id')
                ->constrained('empleados', indexName: 'fk_dictamen_productos_empleados')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->foreignId('producto_id')
                ->constrained('productos', indexName: 'fk_dictamen_productos_productos')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->string('caracteristicas', 255)
                ->nullable();
        });

        Schema::create('dictamen_articulos', function (Blueprint $table) {
            $table->foreignId('producto_id')
                ->constrained('dictamen_productos', indexName: 'fk_dictamen_articulos_dictamen_productos')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->foreignId('articulo_id')
                ->primary()
                ->constrained('articulos', indexName: 'fk_dictamen_articulos_articulos')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('dictamen_articulos');
        Schema::dropIfExists('dictamen_productos');
        Schema::dropIfExists('dictamenes');
        Schema::dropIfExists('dictamen_estados');
    }
};
