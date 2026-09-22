<?php

namespace App\Data\Dictamen;

use App\Http\Requests\Dictamen\StoreDictamenRequest;
use Spatie\LaravelData\Data;
use App\Data\Oficio\StoreOficioData;
use Spatie\LaravelData\Attributes\DataCollectionOf;
use Spatie\LaravelData\Mappers\SnakeCaseMapper;
use Spatie\LaravelData\Attributes\MapInputName;

#[MapInputName(SnakeCaseMapper::class)]
class StoreDictamenData extends Data
{
    public function __construct(
        public int $adscripcionId,
        public StoreDictamenVersionData $version,

        #[DataCollectionOf(StoreDictamenAdquisicionData::class)]
        public array $adquisiciones,

        public StoreOficioData|null $oficio = null
    ) {}

    public static function fromRequest(StoreDictamenRequest $request): self
    {
        $validated = $request->validated();

        return new self(
            adscripcionId: $validated['adscripcion_id'],
            version: StoreDictamenVersionData::from([
                'fechaSolicitud' => $validated['fecha_solicitud']
            ]),
            adquisiciones: $validated['adquisiciones'],
            oficio: !empty($validated['folio'])
                ? StoreOficioData::from(['folio' => $validated['folio']])
                : null
        );
    }
}
