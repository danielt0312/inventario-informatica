<?php

use App\Models\ProductoCategoria;

test('atributos')
    ->expect(fn () => ProductoCategoria::factory()->create()->attributesToArray())
    ->toHaveKeys(['id', 'nombre']);
