<?php

namespace App\Services;

use Illuminate\Support\Facades\DB;
use App\Data\Factura\StoreFacturaData;

use App\Models\{
    Archivo,
    Factura
};

class FacturaService
{
    public function __construct(
        protected DocumentoService $documentoService
    ) {}

    public function crear(StoreFacturaData $data, Archivo $archivo): Factura
    {
        return DB::transaction(function () use ($data, $archivo) {
            $factura = Factura::create($data->all());

            $this->documentoService->createForModel($factura, $archivo);

            return $factura;
        });
    }
}
