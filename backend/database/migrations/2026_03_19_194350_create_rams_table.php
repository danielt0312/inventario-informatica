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
        Schema::create('ram_types', function (Blueprint $table) {
            $table->id();
            $table->string('name', length: 150);
        });

        Schema::create('ram_storage_capacities', function (Blueprint $table) {
            $table->id();
            $table->string('name', length: 150);
        });

        Schema::create('ram_clock_speeds', function (Blueprint $table) {
            $table->id();
            $table->string('name', length: 150);
        });

        Schema::create('rams', function (Blueprint $table) {
            $table->id();
            $table->foreignId('ram_type_id')
                ->constrained()
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->foreignId('ram_storage_capacity_id')
                ->constrained()
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->foreignId('ram_clock_speed_id')
                ->nullable()
                ->constrained()
                ->cascadeOnUpdate()
                ->cascadeOnDelete();

            $table->unique(['ram_type_id', 'ram_storage_capacity_id', 'ram_clock_speed_id'], 'rams_unique');
        });

        Schema::create('product_rams', function (Blueprint $table) {
            $table->id();
            $table->foreignId('product_id')
                ->constrained()
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->foreignId('ram_id')
                ->constrained()
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('product_rams');
        Schema::dropIfExists('rams');
        Schema::dropIfExists('ram_clock_speeds');
        Schema::dropIfExists('ram_storage_capacities');
        Schema::dropIfExists('ram_types');
    }
};
