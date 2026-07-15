<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('orden_compras', function (Blueprint $table) {
            $table->id();
            $table->foreignId('documento_id')
                ->constrained('documentos', indexName: 'fk_orden_compras_documentos')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->date('fecha_solicitud');
            $table->string('numero_orden', 64);
            $table->foreignId('proveedor_id')
                ->constrained('proveedores', indexName: 'fk_orden_compras_proveedores')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('orden_compras');
    }
};
