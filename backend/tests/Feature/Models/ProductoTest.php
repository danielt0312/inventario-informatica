<?php

use App\Models\{Producto, ProductoTipo, ProductoMarca};

beforeEach(function () {
    $this->producto = Producto::factory()->create();
});

test('atributos')
    ->expect(fn () => $this->producto->attributesToArray())
    ->toHaveKeys(['id', 'tipo_id', 'marca_id', 'nombre']);

test('vinculos')
    ->expect(fn () => $this->producto)
    ->tipo->toBeInstanceOf(ProductoTipo::class)
    ->marca->toBeInstanceOf(ProductoMarca::class);
