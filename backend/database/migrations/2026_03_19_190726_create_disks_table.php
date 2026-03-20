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
        Schema::create('disk_types', function (Blueprint $table) {
            $table->id();
            $table->string('name', length: 150);
        });

        Schema::create('disk_storage_capacities', function (Blueprint $table) {
            $table->id();
            $table->string('name', length: 150);
        });

        Schema::create('disk_interfaces', function (Blueprint $table) {
            $table->id();
            $table->string('name', length: 150);
        });

        Schema::create('disks', function (Blueprint $table) {
            $table->id();
            $table->foreignId('disk_type_id')
                ->constrained()
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->foreignId('disk_storage_capacity_id')
                ->constrained()
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->foreignId('disk_interface_id')
                ->nullable()
                ->constrained()
                ->cascadeOnUpdate()
                ->cascadeOnDelete();

            $table->unique(['disk_type_id', 'disk_storage_capacity_id', 'disk_interface_id'], 'disks_unique');
        });

        Schema::create('product_disks', function (Blueprint $table) {
            $table->id();
            $table->string('name', length: 150);
            $table->foreignId('product_id')
                ->constrained()
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->foreignId('product_brand_id')
                ->constrained()
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
        });

        Schema::create('item_disks', function (Blueprint $table) {
            $table->id();
            $table->foreignId('item_id')
                ->constrained()
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->foreignId('product_disk_id')
                ->constrained()
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
        });

        Schema::create('item_computer_disks', function (Blueprint $table) {
            $table->id();
            $table->foreignId('item_id')
                ->constrained()
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->foreignId('product_disk_id')
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
        Schema::dropIfExists('product_disks');
        Schema::dropIfExists('disks');
        Schema::dropIfExists('disk_interfaces');
        Schema::dropIfExists('disk_storage_capacities');
        Schema::dropIfExists('disk_types');
    }
};
