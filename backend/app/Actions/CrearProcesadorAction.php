<?php

namespace App\Actions;

use Illuminate\Support\Facades\DB;
use App\Services\ProductoService;
use App\Data\Procesador\StoreProcesadorData;

use App\Models\{
    Procesador,
    ProductoVariante
};

final class CrearProcesadorAction
{
    public function __construct(
        protected ProductoService $productoService
    ) {}

    public function __invoke(StoreProcesadorData $data): ProductoVariante
    {
        return DB::transaction(function () use ($data) {
            $procesador = Procesador::firstOrCreate($data->spec->toArray());

            return $this->productoService->crearConVariante($data->toProductoIdentidad(), $procesador);
        });
    }
}
