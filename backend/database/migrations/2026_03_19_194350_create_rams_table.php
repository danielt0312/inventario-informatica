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
        Schema::create('ram_tipos', function (Blueprint $table) {
            $table->id();
            $table->string('nombre', length: 150);
        });

        Schema::create('ram_capacidades', function (Blueprint $table) {
            $table->id();
            $table->string('nombre', length: 150);
        });

        Schema::create('ram_frecuencias', function (Blueprint $table) {
            $table->id();
            $table->string('nombre', length: 150);
        });

        Schema::create('rams', function (Blueprint $table) {
            $table->id();
            $table->foreignId('ram_tipo_id')
                ->constrained(table: 'ram_tipos', indexName: 'rams_ram_tipos_fk')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->foreignId('ram_capacidad_id')
                ->constrained(table: 'ram_capacidades', indexName: 'rams_ram_capacidades')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->foreignId('ram_frecuencia_id')
                ->nullable()
                ->constrained(table: 'ram_frecuencias', indexName: 'rams_ram_frecuencias_fk')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();

            $table->unique(['ram_tipo_id', 'ram_capacidad_id', 'ram_frecuencia_id'], 'rams_uk');
        });

        Schema::create('producto_rams', function (Blueprint $table) {
            $table->id();
            $table->foreignId('producto_id')
                ->constrained(table: 'productos', indexName: 'producto_rams_productos_fk')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->foreignId('ram_id')
                ->constrained(table: 'rams', indexName: 'producto_rams_rams_fk')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('producto_rams');
        Schema::dropIfExists('rams');
        Schema::dropIfExists('ram_frecuencias');
        Schema::dropIfExists('ram_capacidades');
        Schema::dropIfExists('ram_tipos');
    }
};
