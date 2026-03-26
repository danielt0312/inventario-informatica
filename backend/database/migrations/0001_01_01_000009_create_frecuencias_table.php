<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('frecuencia_unidades', function (Blueprint $table) {
            $table->id();
            $table->string('nombre', length: 3);
        });

        Schema::create('frecuencias', function (Blueprint $table) {
            $table->id();
            $table->string('cantidad', length: 5);
            $table->foreignId('frecuencia_unidad_id')
                ->constrained('frecuencia_unidades', indexName: 'frecuencias_frecuencia_unidades_fk')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('frecuencias');
        Schema::dropIfExists('frecuencia_unidades');
    }
};
