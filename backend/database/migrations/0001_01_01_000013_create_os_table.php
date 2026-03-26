<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('os_tipos', function (Blueprint $table) {
            $table->id();
            $table->string('nombre', length: 32);
        });

        Schema::create('os_ediciones', function (Blueprint $table) {
            $table->id();
            $table->string('nombre', length: 32);
            $table->foreignId('os_tipo_id')
                ->constrained('os_tipos', indexName: 'os_ediciones_os_tipos_fk')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
        });

        Schema::create('item_computadora_os', function (Blueprint $table) {
            $table->foreignId('computadora_item_id')
                ->primary()
                ->constrained('items', indexName: 'item_computadora_os_items_fk')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->foreignId('os_edicion_id')
                ->constrained('os_ediciones', indexName: 'item_computadora_os_os_ediciones_fk')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->string('version', length: 32)
                ->nullable();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('item_computadora_os');
        Schema::dropIfExists('os_ediciones');
        Schema::dropIfExists('os_tipos');
    }
};
