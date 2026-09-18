<?php

namespace App\Services;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Model;
use App\Enums\DocumentoTipoEnum;
use App\Models\{
    Archivo,
    Documento
};

class DocumentoService
{
    public function createForModel(Model $model, Archivo $archivo): Documento
    {
        return DB::transaction(function () use ($model, $archivo) {
            $tipoEnum = DocumentoTipoEnum::fromModel($model);

            $documento = $archivo->documento()->make([
                'tipo_id' => $tipoEnum->value,
            ]);

            $documento->documentable()->associate($model);
            $documento->save();

            return $documento;
        });
    }
}
