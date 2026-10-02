<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('camara_tipos', function (Blueprint $table) {
            $table->id();
            $table->string('nombre', 64);
        });

        Schema::create('camaras', function (Blueprint $table) {
            $table->id();
            $table->foreignId('tipo_id')
                ->unique('uk_camaras')
                ->constrained('camara_tipos', indexName: 'fk_camaras_camara_tipos')
                ->cascadeOnUpdate()
                ->restrictOnDelete();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('articulo_camaras');
    }
};
