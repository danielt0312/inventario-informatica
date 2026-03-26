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
            $table->string('nombre', length: 32);
        });

        Schema::create('oficio_asuntos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('oficio_tipo_id')
                ->constrained('oficio_tipos', indexName: 'oficio_asuntos_oficios_tipos_fk')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->string('nombre', length: 32)
                ->nullable();
        });

        Schema::create('oficios', function (Blueprint $table) {
            $table->id();
            $table->foreignId('documento_id')
                ->constrained('documentos', indexName: 'oficios_documentos_fk')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->foreignId('oficio_asunto_id')
                ->constrained('oficio_asuntos', indexName: 'oficios_oficio_asuntos_fk')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->string('folio')
                ->unique('oficios_folio_uk');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('oficios');
        Schema::dropIfExists('oficio_asuntos');
        Schema::dropIfExists('oficio_tipos');
    }
};
