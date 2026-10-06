<?php

namespace App\Actions;

use Illuminate\Support\Facades\DB;
use App\Services\ProductoService;
use App\Data\Camara\StoreCamaraData;

use App\Models\{
    Camara,
    ProductoVariante
};

final class CrearCamaraAction
{
    public function __construct(
        protected ProductoService $productoService
    ) {}

    public function __invoke(StoreCamaraData $data): ProductoVariante
    {
        return DB::transaction(function () use ($data) {
            $camara = Camara::firstOrCreate($data->spec->toArray());

            return $this->productoService->crearConVariante($data->toProductoIdentidad(), $camara);
        });
    }
}
