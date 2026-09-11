<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('articulo_computadoras', function (Blueprint $table) {
            $table->id();
            $table->foreignId('articulo_id')
                ->unique('uk_articulo_computadoras')
                ->constrained('articulos', indexName: 'fk_articulo_computadoras_articulos')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->unsignedBigInteger('producto_cpu_id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('articulo_computadoras');
    }
};
