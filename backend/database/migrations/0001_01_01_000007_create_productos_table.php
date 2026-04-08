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
            $table->string('nombre', 32);
        });

        Schema::create('producto_tipos', function (Blueprint $table) {
            $table->id();
            $table->string('nombre', 32);
            $table->foreignId('categoria_id')
                ->constrained('producto_categorias', indexName: 'fk_producto_tipos_producto_categorias')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
        });

        Schema::create('producto_marcas', function (Blueprint $table) {
            $table->id();
            $table->string('nombre', 32);
        });

        Schema::create('productos', function (Blueprint $table) {
            $table->id();
            $table->string('nombre', 32);
            $table->foreignId('tipo_id')
                ->constrained('producto_tipos', indexName: 'fk_productos_producto_tipos')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->foreignId('marca_id')
                ->constrained('producto_marcas', indexName: 'fk_productos_producto_marcas')
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
