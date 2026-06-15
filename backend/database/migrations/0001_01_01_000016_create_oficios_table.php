<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('oficios', function (Blueprint $table) {
            $table->id();
            $table->foreignId('documento_id')
                ->constrained('documentos', indexName: 'fk_oficios_documentos')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->string('folio', 64)
                ->unique('uk_oficios_folio');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('oficios');
    }
};
