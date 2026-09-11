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
            $table->string('nombre', 64);
        });

        Schema::create('ram_capacidades', function (Blueprint $table) {
            $table->id();
            $table->string('nombre', 64);
        });

        Schema::create('ram_velocidades', function (Blueprint $table) {
            $table->id();
            $table->string('nombre', 64);
        });

        Schema::create('rams', function (Blueprint $table) {
            $table->id();
            $table->foreignId('tipo_id')
                ->constrained('ram_tipos', indexName: 'fk_rams_ram_tipos')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->foreignId('capacidad_id')
                ->constrained('ram_capacidades', indexName: 'fk_rams_ram_capacidades')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->foreignId('frecuencia_id')
                ->nullable()
                ->constrained('ram_velocidades', indexName: 'fk_rams_ram_velocidades')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();

            $table->unique(['tipo_id', 'capacidad_id', 'frecuencia_id'], 'uk_rams');
        });

        Schema::create('producto_rams', function (Blueprint $table) {
            $table->id();
            $table->foreignId('producto_id')
                ->constrained('productos', indexName: 'fk_producto_rams_productos')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->foreignId('ram_id')
                ->constrained('rams', indexName: 'fk_producto_rams_rams')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
        });

        Schema::create('articulo_rams', function (Blueprint $table) {
            $table->id();
            $table->foreignId('articulo_id')
                ->constrained('articulos', indexName: 'fk_articulo_rams_articulos')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->foreignId('producto_ram_id')
                ->constrained('producto_rams', indexName: 'fk_articulo_rams_producto_rams')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
        });

        Schema::create('articulo_computadora_rams', function (Blueprint $table) {
            $table->id();
            $table->foreignId('computadora_articulo_id')
                ->constrained('articulos', indexName: 'fk_articulo_computadora_rams_articulos_computadora')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->foreignId('ram_articulo_id')
                ->constrained('articulo_rams', indexName: 'fk_articulo_computadora_rams_articulo_rams')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->date('fecha_instalacion');
            $table->date('fecha_desinstalacion')
                ->nullable();
            $table->unsignedBigInteger('ram_vigente_marker')
                ->virtualAs('CASE WHEN fecha_desinstalacion IS NULL THEN ram_articulo_id ELSE NULL END')
                ->nullable();
            $table->timestamps();

            $table->unique('ram_vigente_marker', 'uk_articulo_computadora_rams_ram_vigente');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('articulo_computadora_rams');
        Schema::dropIfExists('articulo_rams');
        Schema::dropIfExists('producto_rams');
        Schema::dropIfExists('rams');
        Schema::dropIfExists('ram_velocidades');
        Schema::dropIfExists('ram_capacidades');
        Schema::dropIfExists('ram_tipos');
    }
};
