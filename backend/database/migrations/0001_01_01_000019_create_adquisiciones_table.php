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
            $table->string('nombre', length: 32);
        });

        Schema::create('adquisiciones', function (Blueprint $table) {
            $table->id();
            $table->foreignId('adquisicion_estado_id')
                ->constrained('adquisicion_estados', indexName: 'adquisiciones_adquisicion_estados_fk')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->foreignId('oficio_id')
                ->constrained('oficios', indexName: 'adquisiciones_oficios_fk')
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

        Schema::create('adquisicion_productos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('adquisicion_id')
                ->constrained('adquisiciones', indexName: 'adquisicion_productos_adquisiciones_fk')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->foreignId('producto_id')
                ->constrained('productos', indexName: 'adquisicion_productos_producto_fk')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->string('producto_descripcion', length: 255);
            $table->tinyInteger('cantidad');
        });

        Schema::create('adquisicion_articulos', function (Blueprint $table) {
            $table->foreignId('adquisicion_id')
                ->constrained('adquisiciones', indexName: 'adquisicion_articulos_adquisiciones_fk')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->foreignId('articulo_id')
                ->primary()
                ->constrained('articulos', indexName: 'adquisicion_articulos_articulos_fk')
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
