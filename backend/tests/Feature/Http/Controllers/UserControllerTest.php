<?php

use App\Models\User;

test('devuelve la info del usuario', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user, 'sanctum')
        ->getJson('api/user');

    $response->assertStatus(200)
        ->assertJsonStructure([
            'data' => ['id', 'name', 'email'],
        ]);
});
