<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('resguardos', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('empleado_id');
            $table->date('fecha_actualizacion');
            $table->date('fecha_cancelacion')
                ->nullable();
            $table->foreignId('documento_id')
                ->constrained('documentos', indexName: 'fk_resguardos_documentos')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->boolean('es_cancelado');
            $table->timestamps();
        });

        Schema::create('resguardo_articulos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('resguardo_id')
                ->constrained('resguardos', indexName: 'fk_resguardo_articulos_resguardos')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->foreignId('articulo_id')
                ->constrained('articulos', indexName: 'fk_resguardo_articulos_articulos')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->date('fecha_asignacion');
            $table->date('fecha_cancelacion')
                ->nullable();

            $table->unique(['resguardo_id', 'articulo_id'], 'uk_resguardo_articulos');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('resguardo_articulos');
        Schema::dropIfExists('resguardos');
    }
};
