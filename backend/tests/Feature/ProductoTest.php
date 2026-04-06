<?php

use App\Models\User;

test('devuelve los registros de producto_marcas', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user, 'sanctum')
        ->getJson('api/producto_marcas');

    $response->assertStatus(200)
        ->assertJsonStructure([
            'data' => ['*' => [
                'id', 'nombre'
            ]],
        ]);
});
