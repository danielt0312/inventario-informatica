<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('os_tipos', function (Blueprint $table) {
            $table->id();
            $table->string('nombre', 64);
        });

        Schema::create('os_ediciones', function (Blueprint $table) {
            $table->id();
            $table->string('nombre', 64);
            $table->foreignId('tipo_id')
                ->constrained('os_tipos', indexName: 'fk_os_ediciones_os_tipos')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
        });

        Schema::create('articulo_computadora_os', function (Blueprint $table) {
            $table->foreignId('computadora_articulo_id')
                ->primary()
                ->constrained('articulos', indexName: 'fk_articulo_computadora_os_articulos_computadora')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->foreignId('edicion_id')
                ->constrained('os_ediciones', indexName: 'fk_articulo_computadora_os_os_ediciones')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->string('version', 64)
                ->nullable();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('articulo_computadora_os');
        Schema::dropIfExists('os_ediciones');
        Schema::dropIfExists('os_tipos');
    }
};
