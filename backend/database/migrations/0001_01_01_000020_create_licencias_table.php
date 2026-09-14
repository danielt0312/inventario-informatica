<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('licencia_estados', function (Blueprint $table) {
            $table->id();
            $table->string('nombre', 64);
        });

        Schema::create('licencias', function (Blueprint $table) {
            $table->id();
            $table->foreignId('estado_id')
                ->constrained('licencia_estados', indexName: 'fk_licencias_licencia_estados')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->foreignId('dictamen_id')
                ->nullable()
                ->constrained('dictamenes', indexName: 'fk_licencias_dictamenes')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('licencias');
        Schema::dropIfExists('licencia_estados');
    }
};
