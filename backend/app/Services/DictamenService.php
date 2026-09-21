<?php

namespace App\Services;

use App\Enums\ProductoTipoEnum;
use App\Models\{
    Archivo,
    Dicamen
};
use App\Data\Dictamen\StoreDictamenData;
use Illuminate\Support\Facades\DB;

class DictamenService
{
    public function __construct(
        protected OficioService $oficioService
    )

    public function store(StoreDictamenData $data, ?Archivo $oficioArchivo): Dictamen
    {
        return DB::transaction(function () use ($data, $oficioArchivo) {
            // todo identificar si el area de adscripcion es la interna
            // todo centralizar esta verificacion
            $oficioId = $data->adscripcionId != 2
                // todo validar que `oficioArchivo` y `oficio` hayan sido pasados
                ? $this->oficioService->create($data->oficio, $oficioArchivo)->id
                : null;

            $dictamen = Dictamen::create([
                'empleado_id' => $data->empleadoId,
                'adscripcion_id' => $data->adscripcionId,
                'oficio_id' => $oficioId
            ]);

            $nuevaVersion = $dictamen->versiones()->create([
                'fecha_solicitud' => $data->version->fechaSolicitud,
            ]);

            $nuevaVersion->adquisiciones()->createMany($request->getAdquisicionesValidatedData());

            $dictamen->versionActual()->associate($nuevaVersion)->save();

            return $dictamen;
        });
    }

    public function productoTipoPuedeRequerirNumeroInventario(ProductoTipoEnum $tipo): bool
    {
        return match($tipo) {
            ProductoTipoEnum::DISCO,
            ProductoTipoEnum::RAM,
            ProductoTipoEnum::BOCINA,
            ProductoTipoEnum::MONITOR,
            ProductoTipoEnum::DISCO_OPTICO,
            ProductoTipoEnum::TECLADO,
            ProductoTipoEnum::MOUSE => true,
            default => false
        };
    }
}
