<?php

namespace App\Services;

use App\Models\{
    Archivo,
    Oficio
};
use App\Data\Oficio\StoreOficioData;
use Illuminate\Support\Facades\DB;

class OficioService
{
    public function __construct(
        protected DiscoService $discoService,
    ) {}

    public function create(StoreOficioData $data, Archivo $archivo): Oficio
    {
        return DB::transaction(function () use ($folio, $archivo) {
            $oficio = Oficio::create(['folio' => $data->folio]);

            $this->documentoService->createForModel($oficio, $archivo);

            return $oficio;
        });
    }
}
