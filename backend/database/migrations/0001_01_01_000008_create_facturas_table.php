<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('facturas', function (Blueprint $table) {
            $table->id();
            $table->foreignId('orden_compra_id')
                ->constrained('orden_compras', indexName: 'fk_facturas_orden_compras')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->date('fecha_emision');
            $table->foreignId('documento_id')
                ->constrained('documentos', indexName: 'fk_facturas_documentos')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('facturas');
    }
};
