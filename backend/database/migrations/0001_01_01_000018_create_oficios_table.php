<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('oficios', function (Blueprint $table) {
            $table->id();
            $table->string('folio', 64)
                ->unique('uk_oficios_folio');
            $table->timestamp('verified_at')
                ->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('oficios');
    }
};
