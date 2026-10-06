<?php

namespace App\Actions;

use Illuminate\Support\Facades\DB;
use App\Services\ProductoService;
use App\Data\Ram\StoreRamData;

use App\Models\{
    Ram,
    ProductoVariante
};

final class CrearRamAction
{
    public function __construct(
        protected ProductoService $productoService
    ) {}

    public function __invoke(StoreRamData $data): ProductoVariante
    {
        return DB::transaction(function () use ($data) {
            $ram = Ram::firstOrCreate($data->spec->toArray());

            return $this->productoService->crearConVariante($data->toProductoIdentidad(), $ram);
        });
    }
}
