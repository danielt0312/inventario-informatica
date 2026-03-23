<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('cat_archivo_tipos', function (Blueprint $table) {
            $table->id();
            $table->string('nombre', length: 150);
            $table->string('extension', length: 5);
        });

        Schema::create('archivos', function (Blueprint $table) {
            $table->id();
            $table->uuid();
            $table->string('nombre', length: 150);
            $table->foreignId('cat_archivo_tipo_id')
                ->constrained(table: 'cat_archivo_tipos', indexName: 'archivos_cat_archivo_tipos_fk')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->boolean('activo');
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('cat_documento_tipos', function (Blueprint $table) {
            $table->id();
            $table->string('nombre', length: 150);
        });

        Schema::create('documentos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('cat_documento_tipo_id')
                ->constrained(table: 'cat_documento_tipos', indexName: 'documentos_cat_documento_tipos_fk')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->foreignId('archivo_id')
                ->constrained(table: 'archivos', indexName: 'documentos_archivos_fk')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
        });

        Schema::create('facturas', function (Blueprint $table) {
            $table->id();
            $table->date('fecha_factura');
            $table->foreignId('documento_id')
                ->constrained(table: 'documentos', indexName: 'facturas_documentos_fk')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
        });

        Schema::create('cat_item_estados', function (Blueprint $table) {
            $table->id();
            $table->string('nombre', length: 150);
            $table->timestamps();
        });

        Schema::create('items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('producto_id')
                ->constrained(table: 'productos', indexName: 'items_productos_fk')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->foreignId('cat_item_estado_id')
                ->constrained(table: 'cat_item_estados', indexName: 'items_cat_item_estados_fk')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->string('numero_serie', length: 255)
                ->nullable()
                ->unique();
            $table->decimal('costo_unitario', total: 7, places: 2)
                ->nullable();
            $table->foreignId('factura_id')
                ->nullable()
                ->constrained(table: 'facturas', indexName: 'items_facturas_fk')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->foreignId('qr_archivo_id')
                ->nullable()
                ->constrained(table: 'archivos', indexName: 'items_archivos_fk')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->boolean('is_countable');
            $table->boolean('is_active');
            $table->timestamps();
            $table->softDeletes();
        });

        // Schema::create('item_inspections', function (Blueprint $table) {
        //     $table->primary('item_id')
        //         ->constrained()
        //         ->cascadeOnUpdate()
        //         ->cascadeOnDelete();
        //     $table->boolean('met_expectation');
        //     $table->string('observations', length: 255)
        //         ->nullable();
        //     $table->timestamps();
        // });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Schema::dropIfExists('item_inspections');
        Schema::dropIfExists('items');
        Schema::dropIfExists('cat_item_estados');
        Schema::dropIfExists('facturas');
        Schema::dropIfExists('documentos');
        Schema::dropIfExists('cat_documento_tipos');
        Schema::dropIfExists('archivos');
        Schema::dropIfExists('cat_archivo_tipos');
    }
};
