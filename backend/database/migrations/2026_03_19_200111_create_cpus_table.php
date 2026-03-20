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
        Schema::create('cpu_clock_speeds', function (Blueprint $table) {
            $table->id();
            $table->string('name', length: 150);
            $table->timestamps();
        });

        Schema::create('cpus', function (Blueprint $table) {
            $table->id();
            $table->tinyInteger('cores')
                ->nullable();
            $table->foreignId('cpu_clock_speed_id')
                ->nullable()
                ->constrained()
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->timestamps();

            $table->unique(['cores', 'cpu_clock_speed_id'], 'cpus_unique');
        });

        Schema::create('product_cpus', function (Blueprint $table) {
            $table->id();
            $table->foreignId('product_id')
                ->constrained()
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->foreignId('cpu_id')
                ->constrained()
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('product_cpus');
        Schema::dropIfExists('cpus');
        Schema::dropIfExists('cpu_clock_speeds');
    }
};
