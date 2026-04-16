<?php

use App\Models\{
    User,
    Documento
};

beforeEach(function () {
    $this->user = User::factory()->create();
});

test('obtencion de datos', function () {
    Documento::factory()->count(1)->create();

    $response = $this->actingAs($this->user, 'sanctum')
        ->getJson('api/documentos');

    $response->assertStatus(200)
        ->assertJsonStructure([
            'data' => ['*' => [
                'tipo' => ['id', 'nombre'],
                'archivo' => ['id', 'nombre']
            ]]
        ]);
});
