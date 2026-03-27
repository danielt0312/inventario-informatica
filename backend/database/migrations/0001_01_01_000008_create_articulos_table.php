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
            $table->string('nombre', length: 32);
        });

        Schema::create('articulos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('producto_id')
                ->constrained('productos', indexName: 'articulos_productos_fk')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->foreignId('articulo_estado_id')
                ->constrained('articulo_estados', indexName: 'articulos_articulo_estados_fk')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->string('numero_serie', length: 32)
                ->nullable()
                ->unique('articulos_numero_serie_uk');
            $table->decimal('costo_unitario', total: 7, places: 2)
                ->nullable();
            $table->foreignId('factura_id')
                ->nullable()
                ->constrained('facturas', indexName: 'articulos_facturas_fk')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->foreignId('qr_archivo_id')
                ->nullable()
                ->constrained('archivos', indexName: 'articulos_archivos_fk')
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
                ->constrained('articulos', indexName: 'articulo_recepciones_articulo_fk')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->boolean('resultado_esperado');
            $table->string('observaciones', length: 255);
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
