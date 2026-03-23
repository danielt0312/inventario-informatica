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
        Schema::create('producto_tipos', function (Blueprint $table) {
            $table->id();
            $table->string('nombre', length: 150);
        });

        Schema::create('productos', function (Blueprint $table) {
            $table->id();
            $table->string('nombre', length: 150);
            $table->foreignId('producto_tipo_id')
                ->constrained(table: 'producto_tipos', indexName: 'productos_producto_tipos_fk')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
        });

        Schema::create('producto_marcas', function (Blueprint $table) {
            $table->id();
            $table->string('nombre', length: 150);
        });

        Schema::create('producto_modelos', function (Blueprint $table) {
            $table->id();
            $table->string('nombre', length: 150);
            $table->foreignId('producto_id')
                ->constrained(table: 'productos', indexName: 'producto_modelos_productos_fk')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->foreignId('producto_marca_id')
                ->constrained(table: 'producto_marcas', indexName: 'producto_modelos_producto_marcas_fk')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('producto_modelos');
        Schema::dropIfExists('producto_marcas');
        Schema::dropIfExists('productos');
        Schema::dropIfExists('producto_tipos');
    }
};
