<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('cat_documento_tipos', function (Blueprint $table) {
            $table->id();
            $table->string('nombre', length: 150);
        });

        Schema::create('documentos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('cat_documento_tipo_id')
                ->constrained('cat_documento_tipos', indexName: 'documentos_cat_documento_tipos_fk')
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
        Schema::dropIfExists('cat_documento_tipos');
    }
};
