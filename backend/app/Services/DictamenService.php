<?php

namespace App\Services;

use App\Enums\{
    ProductoTipoEnum,
    DictamenEstadoEnum
};
use App\Models\{
    Archivo,
    Dictamen
};
use App\Data\Dictamen\StoreDictamenData;
use Illuminate\Support\Facades\DB;
use LogicException;

class DictamenService
{
    public function __construct(
        protected OficioService $oficioService
    ) {}

    public function create(StoreDictamenData $data, ?Archivo $oficioArchivo): Dictamen
    {
        $esAdscripcionInterna = $this->esAdscripcionInterna($data->adscripcionId);

        if ($esAdscripcionInterna && $oficioArchivo === null) {
            $this->oficioArchivoMissingFailure();
        }

        return DB::transaction(function () use ($data, $oficioArchivo, $esAdscripcionInterna) {
            $oficio = $esAdscripcionInterna
                ? $this->oficioService->create($data->oficio, $oficioArchivo)
                : null;

            $dictamen = Dictamen::create([
                'estado_id' => DictamenEstadoEnum::Dictaminar->value,
                'empleado_id' => 1, // todo obtener jefe de adscripcion interna
                'adscripcion_id' => $data->adscripcionId,
                'oficio_id' => $oficio?->id
            ]);

            $nuevaVersion = $dictamen->versiones()->create([
                'fecha_solicitud' => $data->version->fechaSolicitud,
            ]);

            $nuevaVersion->adquisiciones()->createMany($data->adquisiciones);

            $dictamen->versionActual()->associate($nuevaVersion);
            $dictamen->save();

            return $dictamen;
        });
    }

    public function esAdscripcionInterna(int $adscripcionId): bool
    {
        // todo identificar si el area de adscripcion es la interna
        // todo revisar si mover a otra seccion
        return $adscripcionId === 2;
    }

    protected function oficioArchivoMissingFailure(): void
    {
        throw new LogicException('El archivo del oficio de solicitud es requerido.');
    }

    public function productoTipoPuedeRequerirNumeroInventario(ProductoTipoEnum $tipo): bool
    {
        return match($tipo) {
            ProductoTipoEnum::Disco,
            ProductoTipoEnum::Ram,
            ProductoTipoEnum::Bocina,
            ProductoTipoEnum::Monitor,
            ProductoTipoEnum::DiscoOptico,
            ProductoTipoEnum::Teclado,
            ProductoTipoEnum::Mouse => true,
            default => false
        };
    }
}
