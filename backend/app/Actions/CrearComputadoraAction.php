<?php

namespace App\Actions;

use Illuminate\Support\Facades\DB;
use App\Services\ProductoService;
use App\Data\Computadora\StoreComputadoraData;

use App\Models\{
    Computadora,
    ProductoVariante
};

final class CrearComputadoraAction
{
    public function __construct(
        protected ProductoService $productoService
    ) {}

    public function __invoke(StoreComputadoraData $data): ProductoVariante
    {
        return DB::transaction(function () use ($data) {
            $computadora = Computadora::firstOrCreate($data->spec->toArray());

            return $this->productoService->crearConVariante($data->toProductoIdentidad(), $computadora);
        });
    }
}
