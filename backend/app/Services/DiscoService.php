<?php

namespace App\Services;

use LogicException;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Model;
use App\Models\{
    Disco,
    ProductoVariante
};
use App\Data\Producto\StoreDiscoData;

class DiscoService
{
    public function __construct(
        ProductoService $productoService,
    ) {}

    public function create(StoreDiscoData $data): ProductoVariante
    {
        return DB::transaction(function () use ($data, $spec) {
            $discoData = $data->disco->all();
            $disco = Disco::firstOrCreate($discoData, $discoData);

            return $this->productoService->createWithVariante($data->producto->all(), $disco);
        });
    }
}
