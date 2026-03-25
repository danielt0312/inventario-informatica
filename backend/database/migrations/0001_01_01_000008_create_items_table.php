<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('cat_item_estados', function (Blueprint $table) {
            $table->id();
            $table->string('nombre', length: 150);
            $table->timestamps();
        });

        Schema::create('items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('producto_id')
                ->constrained('productos', indexName: 'items_productos_fk')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->foreignId('cat_item_estado_id')
                ->constrained('cat_item_estados', indexName: 'items_cat_item_estados_fk')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->string('numero_serie', length: 255)
                ->nullable()
                ->unique();
            $table->decimal('costo_unitario', total: 7, places: 2)
                ->nullable();
            $table->foreignId('factura_id')
                ->nullable()
                ->constrained('facturas', indexName: 'items_facturas_fk')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->foreignId('qr_archivo_id')
                ->nullable()
                ->constrained('archivos', indexName: 'items_archivos_fk')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->boolean('is_countable');
            $table->boolean('is_active');
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('item_recepciones', function (Blueprint $table) {
            $table->foreignId('item_id')
                ->primary()
                ->constrained('items', indexName: 'item_recepciones_item_fk')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->boolean('resultado_esperado');
            $table->string('observaciones', length: 255);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('item_recepciones');
        Schema::dropIfExists('items');
        Schema::dropIfExists('cat_item_estados');
    }
};
