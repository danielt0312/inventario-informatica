<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('adquisicion_estados', function (Blueprint $table) {
            $table->id();
            $table->string('nombre', 32);
        });

        Schema::create('adquisiciones', function (Blueprint $table) {
            $table->id();
            $table->foreignId('estado_id')
                ->constrained('adquisicion_estados', indexName: 'fk_adquisiciones_adquisicion_estados')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->foreignId('oficio_id')
                ->constrained('oficios', indexName: 'fk_adquisiciones_oficios')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->foreignId('documento_id')
                ->nullable()
                ->constrained('documentos', indexName: 'fk_adquisiciones_documentos')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->date('fecha_solicitud');
            $table->boolean('activo');
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('adquisicion_productos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('adquisicion_id')
                ->constrained('adquisiciones', indexName: 'fk_adquisicion_productos_adquisiciones')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->foreignId('producto_id')
                ->constrained('productos', indexName: 'fk_adquisicion_productos_productos')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->string('caracteristicas', 255);
            $table->tinyInteger('cantidad');
        });

        Schema::create('adquisicion_articulos', function (Blueprint $table) {
            $table->foreignId('adquisicion_id')
                ->constrained('adquisiciones', indexName: 'fk_adquisicion_articulos_adquisiciones')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->foreignId('articulo_id')
                ->primary()
                ->constrained('articulos', indexName: 'fk_adquisicion_articulos_articulos')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('adquisicion_articulos');
        Schema::dropIfExists('adquisicion_productos');
        Schema::dropIfExists('adquisiciones');
        Schema::dropIfExists('adquisicion_estados');
    }
};
