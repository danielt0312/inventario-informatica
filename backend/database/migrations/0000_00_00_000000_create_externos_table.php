<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('adscripciones', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('externo_adscripcion_id')
                ->unique('uk_adscripciones');
            $table->timestamp('verified_at');
        });

        Schema::create('empleados', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('externo_empleado_id')
                ->unique('uk_empleados');
            $table->timestamp('verified_at');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('adscripciones');
        Schema::dropIfExists('empleados');
    }
};
