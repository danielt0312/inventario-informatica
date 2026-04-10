<?php

use App\Models\{Custodia, Resguardo};

test('relacion m:m con `Custodia`', function () {
    $custodias = Custodia::factory()->count(2)->create();

    dd($custodias);

    $resguardo = Resguardo::factory()
        ->hasCustodia($custodias)
        ->create();

    $this->assertDatabaseHas('resguardo', ['id' => $resguardo->id]);
});
