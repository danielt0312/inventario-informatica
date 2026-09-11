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
            $table->foreignId('velocidad_id')
                ->nullable()
                ->constrained('ram_velocidades', indexName: 'fk_rams_ram_velocidades')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();

            $table->unique(['tipo_id', 'capacidad_id', 'velocidad_id'], 'uk_rams');
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

            $table->unique(['producto_id', 'ram_id'], 'uk_producto_rams');
        });

        Schema::create('articulo_rams', function (Blueprint $table) {
            $table->id();
            $table->foreignId('articulo_id')
                ->unique('uk_articulo_rams')
                ->constrained('articulos', indexName: 'fk_articulo_rams_articulos')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->foreignId('producto_ram_id')
                ->constrained('producto_rams', indexName: 'fk_articulo_rams_producto_rams')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
        });

        Schema::create('ram_instalaciones', function (Blueprint $table) {
            $table->id();
            $table->foreignId('articulo_computadora_id')
                ->constrained('articulo_computadoras', indexName: 'fk_ram_instalaciones_articulo_computadoras')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->foreignId('articulo_ram_id')
                ->constrained('articulo_rams', indexName: 'fk_ram_instalaciones_articulo_rams')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->date('fecha_instalacion');
            $table->date('fecha_desinstalacion')
                ->nullable();
            $table->unsignedBigInteger('ram_vigente_marker')
                ->virtualAs('CASE WHEN fecha_desinstalacion IS NULL THEN articulo_ram_id ELSE NULL END')
                ->nullable();
            $table->timestamps();

            $table->unique('ram_vigente_marker', 'uk_ram_instalaciones_ram_vigente');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('ram_instalaciones');
        Schema::dropIfExists('articulo_rams');
        Schema::dropIfExists('producto_rams');
        Schema::dropIfExists('rams');
        Schema::dropIfExists('ram_velocidades');
        Schema::dropIfExists('ram_capacidades');
        Schema::dropIfExists('ram_tipos');
    }
};
