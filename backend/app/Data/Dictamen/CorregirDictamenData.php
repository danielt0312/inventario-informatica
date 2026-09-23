<?php

namespace App\Data\Dictamen;

use Spatie\LaravelData\Data;
use Spatie\LaravelData\Attributes\DataCollectionOf;
use Spatie\LaravelData\Mappers\SnakeCaseMapper;
use Spatie\LaravelData\Attributes\MapInputName;
use App\Http\Requests\Dictamen\CorregirDictamenRequest;

#[MapInputName(SnakeCaseMapper::class)]
class CorregirDictamenData extends Data
{
    public function __construct(
        public string $motivoCambio,

        #[DataCollectionOf(CorregirDictamenAdquisicionData::class)]
        public array $adquisiciones
    ) {}

    public static function fromRequest(CorregirDictamenRequest $request): self
    {
        return new self(
            motivoCambio: $request->validated('motivo_cambio'),
            adquisiciones: $request->getAdquisicionesValidatedData()
        );
    }
}
