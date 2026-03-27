<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('custodias', function (Blueprint $table) {
            $table->id();
            $table->foreignId('articulo_id')
                ->constrained('articulos', indexName: 'custodias_articulos_fk')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->date('fecha_asignacion');
        });

        Schema::create('resguardos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')
                ->constrained('users', indexName: 'resguardos_users_fk')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->date('fecha_actualizacion');
            $table->date('fecha_cancelacion')
                ->nullable();
            $table->foreignId('documento_id')
                ->nullable()
                ->constrained('documentos', indexName: 'resguardos_documentos_fk')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->boolean('activo');
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('resguardo_custodia', function (Blueprint $table) {
            $table->id();
            $table->foreignId('resguardo_id')
                ->constrained('resguardos', indexName: 'resguardo_custodia_resguardos_fk')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->foreignId('custodia_id')
                ->constrained('custodias', indexName: 'resguardo_custodia_custodias_fk')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();

            $table->unique(['resguardo_id', 'custodia_id'], 'resguardo_custodia_uk');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('resguardo_custodia');
        Schema::dropIfExists('resguardos');
        Schema::dropIfExists('custodias');
    }
};
