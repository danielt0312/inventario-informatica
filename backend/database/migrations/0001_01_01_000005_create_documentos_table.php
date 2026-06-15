<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('documento_tipos', function (Blueprint $table) {
            $table->id();
            $table->string('nombre', 64);
        });

        Schema::create('documentos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('tipo_id')
                ->constrained('documento_tipos', indexName: 'fk_documentos_documento_tipos')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->foreignId('archivo_id')
                ->constrained('archivos', indexName: 'fk_documentos_archivos')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('documentos');
        Schema::dropIfExists('documento_tipos');
    }
};
