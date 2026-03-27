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

        Schema::create('articulo_rams', function (Blueprint $table) {
            $table->foreignId('articulo_id')
                ->primary()
                ->constrained('articulos', indexName: 'articulo_rams_articulos_fk')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->foreignId('producto_ram_id')
                ->constrained('producto_rams', indexName: 'articulo_rams_producto_rams_fk')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
        });

        Schema::create('articulo_computadora_rams', function (Blueprint $table) {
            $table->id();
            $table->foreignId('computadora_articulo_id')
                ->constrained('articulos', indexName: 'computadora_articulo_computadora_rams_articulos_fk')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->foreignId('ram_articulo_id')
                ->constrained('articulo_rams', 'articulo_id', 'ram_articulo_computadora_rams_articulos_fk')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->boolean('principal');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('articulo_computadora_rams');
        Schema::dropIfExists('articulo_rams');
        Schema::dropIfExists('producto_rams');
        Schema::dropIfExists('rams');
        Schema::dropIfExists('ram_capacidades');
        Schema::dropIfExists('ram_tipos');
    }
};
