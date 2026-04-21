<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('oficio_tipos', function (Blueprint $table) {
            $table->id();
            $table->string('nombre', 64);
        });

        Schema::create('oficio_asuntos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('tipo_id')
                ->constrained('oficio_tipos', indexName: 'fk_oficio_asuntos_oficio_tipos')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->string('nombre', 64)
                ->nullable();
        });

        Schema::create('oficios', function (Blueprint $table) {
            $table->id();
            $table->foreignId('documento_id')
                ->constrained('documentos', indexName: 'fk_oficios_documentos')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->foreignId('asunto_id')
                ->constrained('oficio_asuntos', indexName: 'fk_oficios_oficio_asuntos')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->string('folio', 64)
                ->unique('uk_oficios_folio');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('oficios');
        Schema::dropIfExists('oficio_asuntos');
        Schema::dropIfExists('oficio_tipos');
    }
};
