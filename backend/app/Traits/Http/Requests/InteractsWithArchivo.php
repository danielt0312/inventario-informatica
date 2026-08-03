<?php

namespace App\Traits\Http\Requests;

use App\Models\Archivo;

trait InteractsWithArchivo
{
    protected Archivo $archivo;

    public function archivoRule(): array
    {
        return [
            'bail',
            'required',
            'uuid',
            function (string $attribute, string $value, \Closure $fail) {
                $archivo = Archivo::where('uuid', $value)->first();

                if (! $archivo) {
                    $fail('validation.exists')->translate();
                    return;
                }

                $this->setArchivo($archivo);
            },
        ];
    }

    protected function setArchivo(Archivo $archivo): void
    {
        $this->archivo = $archivo;
    }

    public function getArchivo(): Archivo
    {
        return $this->archivo;
    }
}
