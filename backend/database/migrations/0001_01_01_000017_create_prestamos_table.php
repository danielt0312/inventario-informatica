<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('prestamo_estados', function (Blueprint $table) {
            $table->id();
            $table->string('nombre', 64);
        });

        Schema::create('prestamo_motivos', function (Blueprint $table) {
            $table->id();
            $table->string('nombre', 64);
        });

        Schema::create('prestamos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('articulo_id')
                ->constrained('articulos', indexName: 'fk_prestamos_articulos')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->foreignId('estado_id')
                ->constrained('prestamo_estados', indexName: 'fk_prestamos_prestamo_estados')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->foreignId('motivo_id')
                ->constrained('prestamo_motivos', indexName: 'fk_prestamos_prestamo_motivos')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->foreignId('solicitante_user_id')
                ->constrained('users', indexName: 'fk_prestamos_solicitante_users')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->date('fecha_entrega');
            $table->foreignId('proveedor_user_id')
                ->constrained('users', indexName: 'fk_prestamos_proveedor_users')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->date('fecha_devolucion')
                ->nullable();
            $table->foreignId('receptor_user_id')
                ->constrained('users', indexName: 'fk_prestamos_receptor_users')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->foreignId('documento_id')
                ->nullable()
                ->constrained('documentos', indexName: 'fk_prestamos_documentos')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->string('observaciones', 255)
                ->nullable();
            $table->timestamps();
        });

        Schema::create('prestamo_motivo_otros', function (Blueprint $table) {
            $table->foreignId('prestamo_id')
                ->primary()
                ->constrained('prestamos', indexName: 'fk_prestamo_motivo_otros_prestamos')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->string('nombre', 64);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('prestamo_motivo_otros');
        Schema::dropIfExists('prestamos');
        Schema::dropIfExists('prestamo_motivos');
        Schema::dropIfExists('prestamo_estados');
    }
};
