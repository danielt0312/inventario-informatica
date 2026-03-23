<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('disco_tipos', function (Blueprint $table) {
            $table->id();
            $table->string('nombre', length: 150);
        });

        Schema::create('disco_capacidades', function (Blueprint $table) {
            $table->id();
            $table->string('nombre', length: 150);
        });

        Schema::create('disco_interfaces', function (Blueprint $table) {
            $table->id();
            $table->string('nombre', length: 150);
        });

        Schema::create('discos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('disco_tipo_id')
                ->constrained(table: 'disco_tipos', indexName: 'discos_disco_tipos_fk')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->foreignId('disco_capacidad_id')
                ->constrained(table: 'disco_capacidades', indexName: 'discos_disco_capacidades_fk')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->foreignId('disco_interface_id')
                ->nullable()
                ->constrained(table: 'disco_interfaces', indexName: 'discos_disco_interfaces_fk')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();

            $table->unique(['disco_tipo_id', 'disco_capacidad_id', 'disco_interface_id'], 'discos_uk');
        });

        Schema::create('producto_discos', function (Blueprint $table) {
            $table->id();
            $table->string('nombre', length: 150);
            $table->foreignId('producto_id')
                ->constrained(table: 'productos', indexName: 'producto_discos_productos_fk')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->foreignId('producto_marca_id')
                ->constrained(table: 'producto_marcas', indexName: 'producto_discos_producto_marcas_fk')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
        });

        Schema::create('item_discos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('item_id')
                ->constrained(table: 'items', indexName: 'item_discos_items_fk')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->foreignId('producto_disco_id')
                ->constrained(table: 'producto_discos', indexName: 'item_discos_producto_discos_fk')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
        });

        Schema::create('item_computadora_discos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('item_id')
                ->constrained(table: 'items', indexName: 'item_computadora_discos_items_fk')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->foreignId('producto_disco_id')
                ->constrained(table: 'producto_discos', indexName: 'item_computadora_discos_producto_discos_fk')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('item_computadora_discos');
        Schema::dropIfExists('item_discos');
        Schema::dropIfExists('producto_discos');
        Schema::dropIfExists('discos');
        Schema::dropIfExists('disco_interfaces');
        Schema::dropIfExists('disco_capacidades');
        Schema::dropIfExists('disco_tipos');
    }
};
