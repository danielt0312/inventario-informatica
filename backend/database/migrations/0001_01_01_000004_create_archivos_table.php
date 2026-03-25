<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
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
                ->constrained('cat_archivo_tipos', indexName: 'archivos_cat_archivo_tipos_fk')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->boolean('activo');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('archivos');
        Schema::dropIfExists('cat_archivo_tipos');
    }
};
