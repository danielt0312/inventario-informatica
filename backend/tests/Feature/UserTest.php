<?php

use Illuminate\Support\Facades\Artisan;

use App\Models\User;

it('returns user info', function () {
    Artisan::call('migrate --env=.env.testing --database=inventario_testing');

    $user = User::factory()->create();

    $response = $this->actingAs($user, 'sanctum')
        ->getJson('/api/login');

    $response->assertStatus(200)
        ->assertJsonStructure([
            'data' => ['name', 'email']
        ]);
})->only();
