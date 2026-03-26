<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('ram_tipos', function (Blueprint $table) {
            $table->id();
            $table->string('nombre', length: 32);
        });

        Schema::create('ram_capacidades', function (Blueprint $table) {
            $table->id();
            $table->string('nombre', length: 32);
        });

        Schema::create('rams', function (Blueprint $table) {
            $table->id();
            $table->foreignId('ram_tipo_id')
                ->constrained('ram_tipos', indexName: 'rams_ram_tipos_fk')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->foreignId('ram_capacidad_id')
                ->constrained('ram_capacidades', indexName: 'rams_ram_capacidades')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->foreignId('frecuencia_id')
                ->nullable()
                ->constrained('frecuencias', indexName: 'rams_frecuencias_fk')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();

            $table->unique(['ram_tipo_id', 'ram_capacidad_id', 'frecuencia_id'], 'rams_uk');
        });

        Schema::create('producto_rams', function (Blueprint $table) {
            $table->id();
            $table->foreignId('producto_id')
                ->constrained('productos', indexName: 'producto_rams_productos_fk')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->foreignId('ram_id')
                ->constrained('rams', indexName: 'producto_rams_rams_fk')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
        });

        Schema::create('item_rams', function (Blueprint $table) {
            $table->foreignId('item_id')
                ->primary()
                ->constrained('items', indexName: 'item_rams_items_fk')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->foreignId('producto_ram_id')
                ->constrained('producto_rams', indexName: 'item_rams_producto_rams_fk')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
        });

        Schema::create('item_computadora_rams', function (Blueprint $table) {
            $table->id();
            $table->foreignId('computadora_item_id')
                ->constrained('items', indexName: 'computadora_item_computadora_rams_items_fk')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->foreignId('ram_item_id')
                ->constrained('item_rams', 'item_id', 'ram_item_computadora_rams_items_fk')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->boolean('principal');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('item_computadora_rams');
        Schema::dropIfExists('item_rams');
        Schema::dropIfExists('producto_rams');
        Schema::dropIfExists('rams');
        Schema::dropIfExists('ram_capacidades');
        Schema::dropIfExists('ram_tipos');
    }
};
