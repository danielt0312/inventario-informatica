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
        Schema::create('product_types', function (Blueprint $table) {
            $table->id();
            $table->string('name', length: 150);
        });

        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name', length: 150);
            $table->foreignId('product_type_id')
                ->constrained()
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
        });

        Schema::create('product_brands', function (Blueprint $table) {
            $table->id();
            $table->string('name', length: 150);
        });

        Schema::create('product_models', function (Blueprint $table) {
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
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('product_models');
        Schema::dropIfExists('product_brands');
        Schema::dropIfExists('products');
        Schema::dropIfExists('product_types');
    }
};
