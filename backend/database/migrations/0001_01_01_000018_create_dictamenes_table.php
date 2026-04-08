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
            $table->string('nombre', 32);
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
            $table->foreignId('user_id')
                ->constrained('users', indexName: 'fk_dictamen_productos_users')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->foreignId('producto_id')
                ->constrained('productos', indexName: 'fk_dictamen_productos_productos')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->string('caracteristicas', 255)
                ->nullable();
            $table->tinyInteger('cantidad');
        });

        Schema::create('dictamen_articulos', function (Blueprint $table) {
            $table->foreignId('dictamen_id')
                ->constrained('dictamenes', indexName: 'fk_dictamen_articulos_dictamenes')
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
