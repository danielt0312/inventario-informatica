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
        Schema::create('cat_file_types', function (Blueprint $table) {
            $table->id();
            $table->string('name', length: 150);
            $table->char('extension', length: 5);
        });

        Schema::create('files', function (Blueprint $table) {
            $table->id();
            $table->uuid();
            $table->string('name', length: 150);
            $table->foreignId('cat_file_type_id')
                ->constrained()
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->boolean('is_active');
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('cat_document_types', function (Blueprint $table) {
            $table->id();
            $table->string('name', length: 150);
        });

        Schema::create('documents', function (Blueprint $table) {
            $table->id();
            $table->foreignId('cat_document_type_id')
                ->constrained()
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->foreignId('file_id')
                ->constrained()
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
        });

        Schema::create('invoices', function (Blueprint $table) {
            $table->id();
            $table->date('invoice_date');
            $table->foreignId('document_id')
                ->constrained()
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
        });

        Schema::create('cat_item_states', function (Blueprint $table) {
            $table->id();
            $table->string('name', length: 150);
            $table->timestamps();
        });

        Schema::create('items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('product_id')
                ->constrained()
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->foreignId('cat_item_state_id')
                ->constrained()
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->string('serial_number', length: 255)
                ->nullable()
                ->unique();
            $table->decimal('unit_cost', total: 7, places: 2)
                ->nullable();
            $table->foreignId('invoice_id')
                ->nullable()
                ->constrained()
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->foreignId('qr_file_id')
                ->nullable()
                ->constrained(table: 'files', indexName: 'articles_qr_file_id_foreign')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->boolean('is_countable');
            $table->boolean('is_active');
            $table->timestamps();
            $table->softDeletes();
        });

        // Schema::create('item_inspections', function (Blueprint $table) {
        //     $table->primary('item_id')
        //         ->constrained()
        //         ->cascadeOnUpdate()
        //         ->cascadeOnDelete();
        //     $table->boolean('met_expectation');
        //     $table->string('observations', length: 255)
        //         ->nullable();
        //     $table->timestamps();
        // });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('item_inspections');
        Schema::dropIfExists('items');
        Schema::dropIfExists('cat_item_states');
        Schema::dropIfExists('invoices');
        Schema::dropIfExists('documents');
        Schema::dropIfExists('cat_document_types');
        Schema::dropIfExists('files');
        Schema::dropIfExists('cat_file_types');
    }
};
