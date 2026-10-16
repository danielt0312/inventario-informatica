<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('computadora_tipos', function (Blueprint $table) {
            $table->id();
            $table->string('nombre', 64);
        });

        Schema::create('computadoras', function (Blueprint $table) {
            $table->id();
            $table->foreignId('tipo_id')
                ->unique('uk_computadoras')
                ->constrained('computadora_tipos', indexName: 'fk_computadoras_computadora_tipos')
                ->cascadeOnUpdate()
                ->restrictOnDelete();
        });

        Schema::create('articulo_computadoras', function (Blueprint $table) {
            $table->id();
            $table->foreignId('articulo_id')
                ->unique('uk_articulo_computadoras')
                ->constrained('articulos', indexName: 'fk_articulo_computadoras_articulos')
                ->cascadeOnUpdate()
                ->restrictOnDelete();
            $table->foreignId('procesador_id')
                ->constrained('producto_variantes', indexName: 'fk_articulo_computadoras_producto_variantes')
                ->cascadeOnUpdate()
                ->restrictOnDelete();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('articulo_computadoras');
        Schema::dropIfExists('computadoras');
        Schema::dropIfExists('computadora_tipos');
    }
};
