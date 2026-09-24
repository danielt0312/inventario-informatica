<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\{
    Schema,
    DB
};

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('producto_categorias', function (Blueprint $table) {
            $table->id();
            $table->string('nombre', 64)
                ->unique('uk_producto_categorias');
        });

        Schema::create('producto_tipos', function (Blueprint $table) {
            $table->id();
            $table->string('nombre', 64)
                ->unique('uk_producto_tipos');
            $table->foreignId('categoria_id')
                ->constrained('producto_categorias', indexName: 'fk_producto_tipos_producto_categorias')
                ->cascadeOnUpdate()
                ->restrictOnDelete();
            $table->boolean('es_tangible');
        });

        Schema::create('producto_marcas', function (Blueprint $table) {
            $table->id();
            $table->string('nombre', 64)
                ->unique('uk_producto_marcas');
        });

        Schema::create('productos', function (Blueprint $table) {
            $table->id();
            $table->string('modelo', 128);
            $table->foreignId('tipo_id')
                ->constrained('producto_tipos', indexName: 'fk_productos_producto_tipos')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->foreignId('marca_id')
                ->constrained('producto_marcas', indexName: 'fk_productos_producto_marcas')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();

            $table->unique(['tipo_id', 'marca_id', 'modelo'], 'uk_productos');
        });

        Schema::create('producto_variantes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('producto_id')
                ->constrained('productos', indexName: 'fk_producto_variantes_productos')
                ->restrictOnDelete();
            $table->nullableMorphs('variante', 'idx_producto_variantes_morph');
            $table->unsignedBigInteger('variante_generica_marker')
                ->nullable()
                ->virtualAs('CASE WHEN variante_type IS NULL THEN producto_id ELSE NULL END');

            $table->unique('variante_generica_marker', 'uk_producto_variantes_generica');
            $table->unique(
                ['producto_id', 'variante_type', 'variante_id'],
                'uk_producto_variantes_spec'
            );
        });

        DB::statement(<<<'SQL'
            ALTER TABLE producto_variantes
            ADD CONSTRAINT chk_producto_variantes_morph CHECK (
                (variante_type IS NULL AND variante_id IS NULL)
                OR (variante_type IS NOT NULL AND variante_id IS NOT NULL)
            )
            SQL);
    }

    public function down(): void
    {
        Schema::dropIfExists('producto_variantes');
        Schema::dropIfExists('productos');
        Schema::dropIfExists('producto_marcas');
        Schema::dropIfExists('producto_tipos');
        Schema::dropIfExists('producto_categorias');
    }
};
