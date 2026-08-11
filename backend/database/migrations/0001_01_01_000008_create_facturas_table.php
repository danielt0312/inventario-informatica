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
            $table->string('folio', 64);
            $table->date('fecha_emision');
            $table->foreignId('proveedor_id')
                ->constrained('proveedores', indexName: 'fk_facturas_proveedores')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->foreignId('documento_id')
                ->constrained('documentos', indexName: 'fk_facturas_documentos')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
        });

        Schema::create('factura_orden_compras', function (Blueprint $table) {
            $table->id();
            $table->foreignId('factura_id')
                ->constrained('facturas', indexName: 'fk_factura_orden_compras_facturas')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->foreignId('orden_compra_id')
                ->constrained('orden_compras', indexName: 'fk_factura_orden_compras_orden_compras')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();

            $table->unique(['factura_id', 'orden_compra_id'], 'uk_factura_orden_compras');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('factura_orden_compras');
        Schema::dropIfExists('facturas');
    }
};
