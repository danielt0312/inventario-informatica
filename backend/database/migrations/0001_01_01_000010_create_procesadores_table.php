<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('procesadores', function (Blueprint $table) {
            $table->id();
            $table->unsignedTinyInteger('nucleos')
                ->nullable();
            $table->unsignedTinyInteger('hilos')
                ->nullable();
            $table->decimal('frecuencia_maxima_ghz', 4, 2)
                ->nullable();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('procesadores');
    }
};
