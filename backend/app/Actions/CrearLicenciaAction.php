<?php

namespace App\Actions;

use Illuminate\Support\Facades\DB;
use App\Services\ProductoService;
use App\Data\Licencia\StoreLicenciaData;

use App\Models\{
    Licencia,
    ProductoVariante
};

final class CrearLicenciaAction
{
    public function __construct(
        protected ProductoService $productoService
    ) {}

    public function __invoke(StoreLicenciaData $data): ProductoVariante
    {
        return DB::transaction(function () use ($data) {
            $licencia = Licencia::firstOrCreate($data->spec->toArray());

            return $this->productoService->crearConVariante($data->toProductoIdentidad(), $licencia);
        });
    }
}
