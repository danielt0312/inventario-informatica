<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('cpu_frecuencias', function (Blueprint $table) {
            $table->id();
            $table->string('nombre', length: 150);
            $table->timestamps();
        });

        Schema::create('cpus', function (Blueprint $table) {
            $table->id();
            $table->tinyInteger('cores')
                ->nullable();
            $table->foreignId('cpu_frecuencia_id')
                ->nullable()
                ->constrained('cpu_frecuencias', indexName: 'cpus_cpu_frecuencias_fk')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->timestamps();

            $table->unique(['cores', 'cpu_frecuencia_id'], 'cpus_uk');
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
            $table->timestamps();
        });

        Schema::create('item_computadora_cpus', function (Blueprint $table) {
            $table->id();
            $table->foreignId('computadora_item_id')
                ->constrained('items', indexName: 'computadora_item_computadora_cpu_items_fk')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->foreignId('producto_cpu_id')
                ->constrained('producto_cpus', indexName: 'item_computadora_cpu_producto_cpus_fk')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('item_computadora_cpus');
        Schema::dropIfExists('producto_cpus');
        Schema::dropIfExists('cpus');
        Schema::dropIfExists('cpu_frecuencias');
    }
};
