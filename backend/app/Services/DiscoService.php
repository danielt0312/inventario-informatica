<?php

namespace App\Services;

use Illuminate\Support\Facades\DB;
use App\Enums\ProductoTipoEnum;
use App\Data\Disco\StoreDiscoData;
use App\Data\Producto\ProductoData;

use App\Models\{
    Disco,
    ProductoVariante
};

class DiscoService
{
    public function __construct(
        protected ProductoService $productoService
    ) {}

    public function crear(StoreDiscoData $data): ProductoVariante
    {
        return DB::transaction(function () use ($data) {
            $discoData = $data->disco->all();

            $disco = Disco::firstOrCreate($discoData, $discoData);

            return $this->productoService->crearConVariante($data->producto, $disco);
        });
    }
}
