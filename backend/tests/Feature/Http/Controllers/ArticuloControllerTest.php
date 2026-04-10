<?php

use App\Models\{User, Producto};

test('auth user puede registrar con atributos validos', function () {
    $this->assertDatabaseEmpty('articulos');

    $user = User::factory()->create();
    $producto = Producto::factory()->create();

    $response = $this->actingAs($user, 'sanctum')
        ->postJson('api/articulos', [
            'producto_id' => $producto->id,
            'contable' => false,
        ]);

    $response->assertStatus(201);
    $this->assertDatabaseCount('articulos', 1);
});

