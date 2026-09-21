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
            $table->string('nombre', 64);
        });

        Schema::create('disco_capacidades', function (Blueprint $table) {
            $table->id();
            $table->string('nombre', 64);
        });

        Schema::create('disco_interfaces', function (Blueprint $table) {
            $table->id();
            $table->string('nombre', 64);
        });

        Schema::create('disco_factor_formas', function (Blueprint $table) {
            $table->id();
            $table->string('nombre', 64);
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
            $table->foreignId('factor_forma_id')
                ->nullable()
                ->constrained('disco_factor_formas', indexName: 'fk_discos_disco_factor_formas')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();

            $table->unique(['tipo_id', 'capacidad_id', 'interfaz_id', 'factor_forma_id'], 'uk_discos');
        });

        Schema::create('articulo_discos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('articulo_id')
                ->unique('uk_articulo_discos')
                ->constrained('articulos', indexName: 'fk_articulo_discos_articulos')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
        });

        Schema::create('disco_instalaciones', function (Blueprint $table) {
            $table->id();
            $table->foreignId('articulo_computadora_id')
                ->constrained('articulo_computadoras', indexName: 'fk_disco_instalaciones_articulo_computadoras')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->foreignId('articulo_disco_id')
                ->constrained('articulo_discos', indexName: 'fk_disco_instalaciones_disco_articulos')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->boolean('es_principal');
            $table->date('fecha_instalacion');
            $table->date('fecha_desinstalacion')
                ->nullable();
            $table->unsignedBigInteger('disco_vigente_marker')
                ->virtualAs('CASE WHEN fecha_desinstalacion IS NULL THEN articulo_disco_id ELSE NULL END')
                ->nullable();
            $table->timestamps();

            $table->unique('disco_vigente_marker', 'uk_disco_instalaciones_disco_vigente');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('disco_instalaciones');
        Schema::dropIfExists('articulo_discos');
        Schema::dropIfExists('discos');
        Schema::dropIfExists('disco_interfaces');
        Schema::dropIfExists('disco_capacidades');
        Schema::dropIfExists('disco_tipos');
    }
};
