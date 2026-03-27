<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('software_tipos', function (Blueprint $table) {
            $table->id();
            $table->string('nombre', length: 32);
        });

        Schema::create('articulo_computadora_softwares', function (Blueprint $table) {
            $table->foreignId('computadora_articulo_id')
                ->primary()
                ->constrained('articulos', indexName: 'articulo_computadora_softwares_articulos_fk')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->foreignId('software_tipo_id')
                ->constrained('software_tipos', indexName: 'articulo_computadora_softwares_software_tipos_fk')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->string('version', length: 32)
                ->nullable();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('articulo_computadora_softwares');
        Schema::dropIfExists('software_tipos');
    }
};
