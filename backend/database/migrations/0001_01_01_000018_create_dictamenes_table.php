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
            $table->string('nombre', length: 32);
        });

        Schema::create('dictamenes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('dictamen_estado_id')
                ->constrained('dictamen_estados', indexName: 'dictamenes_dictamen_estados_fk')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->foreignId('oficio_id')
                ->constrained('oficios', indexName: 'dictamenes_oficios_fk')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->foreignId('documento_id')
                ->nullable()
                ->constrained('documentos', indexName: 'adquisiciones_documentos_fk')
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
                ->constrained('dictamenes', indexName: 'dictamen_productos_dictamen_fk')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->foreignId('user_id')
                ->constrained('users', indexName: 'dictamen_productos_user_fk')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->foreignId('producto_id')
                ->constrained('productos', indexName: 'dictamen_productos_producto_fk')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->string('producto_descripcion', length: 255);
            $table->tinyInteger('cantidad');
        });

        Schema::create('dictamen_articulos', function (Blueprint $table) {
            $table->foreignId('dictamen_id')
                ->constrained('dictamenes', indexName: 'dictamen_articulos_dictamenes_fk')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->foreignId('articulo_id')
                ->primary()
                ->constrained('articulos', indexName: 'dictamen_articulos_articulos_fk')
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
