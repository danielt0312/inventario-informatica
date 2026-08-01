<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('archivos', function (Blueprint $table) {
            $table->id();
            $table->uuid();
            $table->string('nombre', 64);
            $table->string('extension', 5);
            $table->unsignedBigInteger('size');
            $table->boolean('activo');
            $table->timestamps();
        });

        Schema::create('archivo_temporales', function (Blueprint $table) {
            $table->id();
            $table->foreignId('archivo_id')
                ->constrained('archivos', indexName: 'fk_archivo_temporales_archivos')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->foreignId('user_id')
                ->constrained('users', indexName: 'fk_archivo_temporales_users')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->date('expires_at');
            $table->timestamp('created_at');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('archivos');
    }
};
