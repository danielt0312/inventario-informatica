<?php

use App\Models\ProductoMarca;

test('atributos')
    ->expect(fn () => ProductoMarca::factory()->create()->attributesToArray())
    ->toHaveKeys(['id', 'nombre']);
