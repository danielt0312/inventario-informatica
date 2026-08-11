<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('proveedores', function (Blueprint $table) {
            $table->id();
            $table->string('nombre', 128);
            $table->string('rfc', 13)
                ->unique('uk_proveedor_rfc');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('proveedores');
    }
};
