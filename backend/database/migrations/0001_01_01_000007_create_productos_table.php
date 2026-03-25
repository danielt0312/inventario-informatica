<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('producto_categorias', function (Blueprint $table) {
            $table->id();
            $table->string('nombre', length: 150);
        });

        Schema::create('producto_tipos', function (Blueprint $table) {
            $table->id();
            $table->string('nombre', length: 150);
            $table->foreignId('producto_categoria_id')
                ->constrained('producto_categorias', indexName: 'productos_producto_categorias_fk')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
        });

        Schema::create('producto_marcas', function (Blueprint $table) {
            $table->id();
            $table->string('nombre', length: 150);
        });

        Schema::create('productos', function (Blueprint $table) {
            $table->id();
            $table->string('nombre', length: 150);
            $table->foreignId('producto_tipo_id')
                ->constrained('producto_tipos', indexName: 'productos_producto_tipos_fk')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->foreignId('producto_marca_id')
                ->constrained('producto_marcas', indexName: 'productos_producto_marcas_fk')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('productos');
        Schema::dropIfExists('producto_marcas');
        Schema::dropIfExists('producto_tipos');
        Schema::dropIfExists('producto_categorias');
    }
};
