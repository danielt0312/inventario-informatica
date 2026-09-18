<?php

namespace App\Services;

use App\Models\{
    Archivo,
    Oficio
};
use Illuminate\Support\Facades\DB;

class OficioService
{
    public function __construct(
        protected DocumentoService $documentoService
    ) {}

    public function create(string $folio, Archivo $archivo): Oficio
    {
        return DB::transaction(function () use ($folio, $archivo) {
            $oficio = Oficio::create(compact('folio'));

            $this->documentoService->createForModel($oficio, $archivo);

            return $oficio;
        });
    }
}
