<?php

use App\Models\{User, Producto, Articulo};

beforeEach(function () {
    $this->user = User::factory()->create();
});

test('auth user puede registrar con atributos validos', function () {
    $this->assertDatabaseEmpty('articulos');

    $producto = Producto::factory()->create();

    $response = $this->actingAs($this->user, 'sanctum')
        ->postJson('api/articulos', [
            'producto_id' => $producto->id,
            'contable' => false,
        ]);

    $response->assertStatus(201);
    $this->assertDatabaseCount('articulos', 1);
});

test('obtencion de articulos (`inventario`)', function () {
    Articulo::factory()->create();

    $response = $this->actingAs($this->user, 'sanctum')
        ->getJson('api/articulos');

    $response->assertStatus(200)
        ->assertJsonStructure([
            'data' => ['*' => [
                'numero_inventario',
                'categoria',
                'tipo',
                'marca',
                'producto',
                'estado'
            ]]
        ]);
});
