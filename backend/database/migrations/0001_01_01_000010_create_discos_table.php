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
            $table->string('nombre', length: 32);
        });

        Schema::create('disco_capacidades', function (Blueprint $table) {
            $table->id();
            $table->string('nombre', length: 32);
        });

        Schema::create('disco_interfaces', function (Blueprint $table) {
            $table->id();
            $table->string('nombre', length: 32);
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
            $table->foreignId('disco_interfaz_id')
                ->nullable()
                ->constrained('disco_interfaces', indexName: 'discos_disco_interfaces_fk')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();

            $table->unique(['disco_tipo_id', 'disco_capacidad_id', 'disco_interfaz_id'], 'discos_uk');
        });

        Schema::create('producto_discos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('producto_id')
                ->constrained('productos', indexName: 'producto_discos_productos_fk')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->foreignId('disco_id')
                ->constrained('discos', indexName: 'producto_discos_discos_fk')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
        });

        Schema::create('articulo_discos', function (Blueprint $table) {
            $table->foreignId('articulo_id')
                ->primary()
                ->constrained('articulos', indexName: 'articulo_discos_articulos_fk')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->foreignId('producto_disco_id')
                ->constrained('producto_discos', indexName: 'articulo_discos_producto_discos_fk')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
        });

        Schema::create('articulo_computadora_discos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('computadora_articulo_id')
                ->constrained('articulos', indexName: 'computadora_articulo_computadora_discos_articulos_fk')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->foreignId('disco_articulo_id')
                ->constrained('articulo_discos', 'articulo_id','disco_articulo_computadora_discos_articulos_fk')
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
