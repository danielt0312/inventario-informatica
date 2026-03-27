<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('cpus', function (Blueprint $table) {
            $table->id();
            $table->tinyInteger('nucleos')
                ->nullable();
            $table->foreignId('frecuencia_id')
                ->nullable()
                ->constrained('frecuencias', indexName: 'cpus_frecuencias_fk')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();

            $table->unique(['nucleos', 'frecuencia_id'], 'cpus_uk');
        });

        Schema::create('producto_cpus', function (Blueprint $table) {
            $table->id();
            $table->foreignId('producto_id')
                ->constrained('productos', indexName: 'producto_cpus_productos_fk')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->foreignId('cpu_id')
                ->constrained('cpus', indexName: 'producto_cpus_cpus_fk')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
        });

        Schema::create('articulo_computadora_cpus', function (Blueprint $table) {
            $table->id();
            $table->foreignId('computadora_articulo_id')
                ->constrained('articulos', indexName: 'computadora_articulo_computadora_cpu_articulos_fk')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->foreignId('producto_cpu_id')
                ->constrained('producto_cpus', indexName: 'articulo_computadora_cpu_producto_cpus_fk')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('articulo_computadora_cpus');
        Schema::dropIfExists('producto_cpus');
        Schema::dropIfExists('cpus');
        Schema::dropIfExists('cpu_frecuencias');
    }
};
