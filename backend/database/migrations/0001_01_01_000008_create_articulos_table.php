<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('articulo_estados', function (Blueprint $table) {
            $table->id();
            $table->string('nombre', 64);
        });

        Schema::create('articulos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('producto_id')
                ->constrained('productos', indexName: 'fk_articulos_productos')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->foreignId('estado_id')
                ->constrained('articulo_estados', indexName: 'fk_articulos_articulo_estados')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->string('numero_serie', 64)
                ->nullable()
                ->unique('uk_articulos_numero_serie');
            $table->decimal('costo_unitario', 7, 2)
                ->nullable();
            $table->foreignId('factura_id')
                ->nullable()
                ->constrained('facturas', indexName: 'fk_articulos_facturas')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->foreignId('qr_archivo_id')
                ->nullable()
                ->constrained('archivos', indexName: 'fk_articulos_archivos')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->boolean('contable');
            $table->boolean('activo');
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('articulo_recepciones', function (Blueprint $table) {
            $table->foreignId('articulo_id')
                ->primary()
                ->constrained('articulos', indexName: 'fk_articulo_recepciones_articulos')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->boolean('resultado_esperado');
            $table->string('observaciones', 255)
                ->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('articulo_recepciones');
        Schema::dropIfExists('articulos');
        Schema::dropIfExists('articulo_estados');
    }
};
