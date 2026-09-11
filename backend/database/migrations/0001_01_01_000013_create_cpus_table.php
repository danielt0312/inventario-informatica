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
                ->constrained('frecuencias', indexName: 'fk_cpus_frecuencias')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();

            $table->unique(['nucleos', 'frecuencia_id'], 'uk_cpus');
        });

        Schema::create('producto_cpus', function (Blueprint $table) {
            $table->id();
            $table->foreignId('producto_id')
                ->constrained('productos', indexName: 'fk_producto_cpus_productos')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->foreignId('cpu_id')
                ->constrained('cpus', indexName: 'fk_producto_cpus_cpus')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
        });

        Schema::table('articulo_computadoras', function (Blueprint $table) {
            $table->foreign('producto_cpu_id', 'fk_articulos_dictamenes_producto_cpus')
                ->references('id')
                ->on('producto_cpus')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('producto_cpus');
        Schema::dropIfExists('cpus');
        Schema::dropIfExists('cpu_frecuencias');
    }
};
