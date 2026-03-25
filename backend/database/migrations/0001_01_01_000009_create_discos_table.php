<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
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
                ->constrained('disco_tipos', indexName: 'discos_disco_tipos_fk')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->foreignId('disco_capacidad_id')
                ->constrained('disco_capacidades', indexName: 'discos_disco_capacidades_fk')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->foreignId('disco_interface_id')
                ->nullable()
                ->constrained('disco_interfaces', indexName: 'discos_disco_interfaces_fk')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();

            $table->unique(['disco_tipo_id', 'disco_capacidad_id', 'disco_interface_id'], 'discos_uk');
        });

        Schema::create('producto_discos', function (Blueprint $table) {
            $table->id();
            $table->string('nombre', length: 150);
            $table->foreignId('producto_id')
                ->constrained('productos', indexName: 'producto_discos_productos_fk')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->foreignId('producto_marca_id')
                ->constrained('producto_marcas', indexName: 'producto_discos_producto_marcas_fk')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
        });

        Schema::create('item_discos', function (Blueprint $table) {
            $table->foreignId('item_id')
                ->primary()
                ->constrained('items', indexName: 'item_discos_items_fk')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->foreignId('producto_disco_id')
                ->constrained('producto_discos', indexName: 'item_discos_producto_discos_fk')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
        });

        Schema::create('item_computadora_discos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('computadora_item_id')
                ->constrained('items', indexName: 'computadora_item_computadora_discos_items_fk')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->foreignId('disco_item_id')
                ->constrained('item_discos', 'item_id','disco_item_computadora_discos_items_fk')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->boolean('principal');
        });
    }

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
