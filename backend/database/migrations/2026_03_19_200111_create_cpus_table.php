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
                ->constrained(table: 'cpu_frecuencias', indexName: 'cpus_cpu_frecuencias_fk')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->timestamps();

            $table->unique(['cores', 'cpu_frecuencia_id'], 'cpus_uk');
        });

        Schema::create('producto_cpus', function (Blueprint $table) {
            $table->id();
            $table->foreignId('producto_id')
                ->constrained(table: 'productos', indexName: 'producto_cpus_productos_fk')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->foreignId('cpu_id')
                ->constrained(table: 'cpus', indexName: 'producto_cpus_cpus_fk')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('producto_cpus');
        Schema::dropIfExists('cpus');
        Schema::dropIfExists('cpu_frecuencias');
    }
};
