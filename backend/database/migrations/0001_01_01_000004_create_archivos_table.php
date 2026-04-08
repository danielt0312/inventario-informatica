<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('archivo_tipos', function (Blueprint $table) {
            $table->id();
            $table->string('nombre', 32);
            $table->string('extension', 5);
        });

        Schema::create('archivos', function (Blueprint $table) {
            $table->id();
            $table->uuid();
            $table->string('nombre', 64);
            $table->foreignId('tipo_id')
                ->constrained('archivo_tipos', indexName: 'fk_archivos_archivo_tipos')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->boolean('activo');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('archivos');
        Schema::dropIfExists('archivo_tipos');
    }
};
