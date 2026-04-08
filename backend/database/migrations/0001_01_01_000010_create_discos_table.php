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
            $table->string('nombre', 32);
        });

        Schema::create('disco_capacidades', function (Blueprint $table) {
            $table->id();
            $table->string('nombre', 32);
        });

        Schema::create('disco_interfaces', function (Blueprint $table) {
            $table->id();
            $table->string('nombre', 32);
        });

        Schema::create('discos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('tipo_id')
                ->constrained('disco_tipos', indexName: 'fk_discos_disco_tipos')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->foreignId('capacidad_id')
                ->constrained('disco_capacidades', indexName: 'fk_discos_disco_capacidades')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->foreignId('interfaz_id')
                ->nullable()
                ->constrained('disco_interfaces', indexName: 'fk_discos_disco_interfaces')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();

            $table->unique(['tipo_id', 'capacidad_id', 'interfaz_id'], 'uk_discos');
        });

        Schema::create('producto_discos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('producto_id')
                ->constrained('productos', indexName: 'fk_producto_discos_productos')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->foreignId('disco_id')
                ->constrained('discos', indexName: 'fk_producto_discos_discos')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
        });

        Schema::create('articulo_discos', function (Blueprint $table) {
            $table->foreignId('articulo_id')
                ->primary()
                ->constrained('articulos', indexName: 'fk_articulo_discos_articulos')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->foreignId('producto_disco_id')
                ->constrained('producto_discos', indexName: 'fk_articulo_discos_producto_discos')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
        });

        Schema::create('articulo_computadora_discos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('computadora_articulo_id')
                ->constrained('articulos', indexName: 'fk_articulo_computadora_discos_articulos_computadora')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->foreignId('disco_articulo_id')
                ->constrained('articulo_discos', 'articulo_id', 'fk_articulo_computadora_discos_articulos_disco')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->boolean('principal');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('articulo_computadora_discos');
        Schema::dropIfExists('articulo_discos');
        Schema::dropIfExists('producto_discos');
        Schema::dropIfExists('discos');
        Schema::dropIfExists('disco_interfaces');
        Schema::dropIfExists('disco_capacidades');
        Schema::dropIfExists('disco_tipos');
    }
};
