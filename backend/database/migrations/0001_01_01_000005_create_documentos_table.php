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
            $table->string('nombre', length: 32);
        });

        Schema::create('documentos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('documento_tipo_id')
                ->constrained('documento_tipos', indexName: 'documentos_documento_tipos_fk')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->foreignId('archivo_id')
                ->constrained('archivos', indexName: 'documentos_archivos_fk')
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
