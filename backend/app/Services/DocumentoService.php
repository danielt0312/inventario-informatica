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
    public function enlazarArchivo(Model $model, Archivo $archivo): Documento
    {
        $tipoEnum = DocumentoTipoEnum::fromModel($model);

        return DB::transaction(function () use ($model, $archivo, $tipoEnum) {
            $archivo->temporal()->delete();

            $documento = $archivo->documento()->make([
                'tipo_id' => $tipoEnum->value,
            ]);

            $documento->documentable()->associate($model);
            $documento->save();

            return $documento;
        });
    }
}
