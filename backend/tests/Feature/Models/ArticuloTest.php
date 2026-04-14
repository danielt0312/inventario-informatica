<?php

use App\Models\Articulo;

test('casting `numero_inventario`', function () {
    $articulo = Articulo::factory()->noContable()->create();

    expect($articulo)
        ->numero_inventario->toMatch('/^\d{3}-01-\d{4}$/');
});
