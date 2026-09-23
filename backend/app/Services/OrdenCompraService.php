<?php

namespace App\Services;

use Illuminate\Support\Facades\DB;
use App\Data\OrdenCompra\StoreOrdenCompraData;

use App\Models\{
    Archivo,
    OrdenCompra
};

class OrdenCompraService
{
    public function __construct(
        protected DocumentoService $documentoService
    ) {}

    public function crear(StoreOrdenCompraData $data, Archivo $archivo): OrdenCompra
    {
        return DB::transaction(function () use ($data, $archivo) {
            $ordenCompra = OrdenCompra::create($data->all());

            $this->documentoService->createForModel($ordenCompra, $archivo);

            return $ordenCompra;
        });
    }
}
