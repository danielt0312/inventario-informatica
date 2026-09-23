<?php

namespace App\Services;

use Illuminate\Support\Facades\DB;
use App\Models\{
    Disco,
    ProductoVariante
};
use App\Data\Disco\StoreDiscoData;

class DiscoService
{
    public function __construct(
        ProductoService $productoService
    ) {}

    public function crear(StoreDiscoData $data): ProductoVariante
    {
        return DB::transaction(function () use ($data, $spec) {
            $discoData = $data->disco->all();

            $disco = Disco::firstOrCreate($discoData, $discoData);

            return $this->productoService->createWithVariante($data->producto->all(), $disco);
        });
    }
}
