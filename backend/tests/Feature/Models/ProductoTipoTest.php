<?php

use App\Models\{ProductoTipo, ProductoCategoria};

beforeEach(function () {
    $this->producto_tipo = ProductoTipo::factory()->create();
});

test('atributos')
    ->expect(fn () => $this->producto_tipo->attributesToArray())
    ->toHaveKeys(['id', 'nombre', 'categoria_id']);

test('vinculos')
    ->expect(fn () => $this->producto_tipo)
    ->categoria->toBeInstanceOf(ProductoCategoria::class);
