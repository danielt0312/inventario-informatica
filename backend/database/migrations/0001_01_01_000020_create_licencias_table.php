<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('licencia_tipos', function (Blueprint $table) {
            $table->id();
            $table->string('nombre', 64);
        });

        Schema::create('licencias', function (Blueprint $table) {
            $table->id();
            $table->foreignId('tipo_id')
                ->constrained('licencia_tipos', indexName: 'fk_licencias_licencia_tipos')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
        });

        Schema::create('producto_licencias', function (Blueprint $table) {
            $table->id();
            $table->foreignId('producto_id')
                ->constrained('productos', indexName: 'fk_producto_licencias_productos')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->foreignId('licencia_id')
                ->constrained('licencias', indexName: 'fk_producto_licencias_licencias')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
        });

        Schema::create('articulo_licencias', function (Blueprint $table) {
            $table->id();
            $table->foreignId('articulo_id')
                ->constrained('articulos', indexName: 'fk_articulo_licencias_articulos')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->foreignId('producto_licencia_id')
                ->constrained('producto_licencias', indexName: 'fk_articulo_licencias_producto_licencias')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->date('fecha_expiracion')
                ->nullable();
            $table->timestamps();
        });

        Schema::create('licencia_instalaciones', function (Blueprint $table) {
            $table->id();
            $table->foreignId('articulo_computadora_id')
                ->constrained('articulo_computadoras', indexName: 'fk_licencia_instalaciones_articulo_computadoras')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->foreignId('articulo_licencia_id')
                ->constrained('articulo_licencias', indexName: 'fk_licencia_instalaciones_licencia_articulos')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->boolean('es_principal');
            $table->date('fecha_instalacion');
            $table->date('fecha_desinstalacion')
                ->nullable();
            $table->unsignedBigInteger('licencia_vigente_marker')
                ->virtualAs('CASE WHEN fecha_desinstalacion IS NULL THEN articulo_licencia_id ELSE NULL END')
                ->nullable();
            $table->timestamps();

            $table->unique('licencia_vigente_marker', 'uk_licencia_instalaciones_licencia_vigente');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('licencias');
        Schema::dropIfExists('licencia_estados');
    }
};
