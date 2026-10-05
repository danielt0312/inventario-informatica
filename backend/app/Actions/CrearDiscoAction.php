<?php

namespace App\Actions;

use Illuminate\Support\Facades\DB;
use App\Services\ProductoService;
use App\Data\Producto\StoreDiscoData;

use App\Models\{
    Disco,
    ProductoVariante
};

final class CrearDiscoAction
{
    public function __construct(
        protected ProductoService $productoService
    ) {}

    public function __invoke(StoreDiscoData $data): ProductoVariante
    {
        return DB::transaction(function () use ($data) {
            $disco = Disco::firstOrCreate($data->spec->toArray());

            return $this->productoService->crearConVariante($data->identidad(), $disco);
        });
    }
}
