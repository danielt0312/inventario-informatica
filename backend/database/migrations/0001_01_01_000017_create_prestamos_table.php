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
            $table->string('nombre', length: 32);
        });

        Schema::create('prestamo_motivos', function (Blueprint $table) {
            $table->id();
            $table->string('nombre', length: 32);
        });

        Schema::create('prestamos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('articulo_id')
                ->constrained('articulos', indexName: 'prestamos_articulos_fk')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->foreignId('prestamo_estado_id')
                ->constrained('prestamo_estados', indexName: 'prestamos_prestamo_estados_fk')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->foreignId('prestamo_motivo_id')
                ->constrained('prestamo_motivos', indexName: 'prestamos_prestamo_motivos_fk')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->foreignId('solicitante_user_id')
                ->constrained('users', indexName: 'prestamos_solicitante_users_fk')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->date('fecha_entrega');
            $table->foreignId('proveedor_user_id')
                ->constrained('users', indexName: 'prestamos_proveedor_users_fk')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->date('fecha_devolucion')
                ->nullable();
            $table->foreignId('receptor_user_id')
                ->constrained('users', indexName: 'prestamos_receptor_users_fk')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->foreignId('documento_id')
                ->nullable()
                ->constrained('documentos', indexName: 'prestamos_documentos_fk')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->string('observaciones', length: 255)
                ->nullable();
            $table->timestamps();
        });

        Schema::create('prestamo_motivo_otros', function (Blueprint $table) {
            $table->foreignId('prestamo_id')
                ->primary()
                ->constrained('prestamos', indexName: 'prestamo_motivo_otros_prestamos_fk')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->string('nombre', length: 32);
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
