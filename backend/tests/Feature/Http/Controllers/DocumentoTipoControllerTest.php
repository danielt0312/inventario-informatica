<?php

use App\Models\User;

use App\DocumentoTipoEnum;

beforeEach(function () {
    $this->user = User::factory()->create();
});

test('obtencion de datos', function () {
    $reponse = $this->actingAs($this->user, 'sanctum')
        ->getJson('api/documento_tipos');

    $reponse->assertOk()
        ->assertJsonStructure([
            'data' => ['*' => [
                'id',
                'nombre'
            ]]
        ])
        ->assertJsonCount(1, 'data');
});
