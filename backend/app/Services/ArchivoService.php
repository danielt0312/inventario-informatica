<?php

namespace App\Services;

use App\Models\Archivo;
use App\Enums\ArchivoTipoEnum;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\{File, UploadedFile};
use InvalidArgumentException;

class ArchivoService
{
    public function create(
        string $nombre,
        ArchivoTipoEnum $tipo
    ): Archivo {
        return Archivo::create([
            'nombre' => pathinfo($nombre, PATHINFO_FILENAME),
            'extension' => $tipo->extension()
        ]);
    }

    public function store(
        Archivo $archivo,
        UploadedFile|File $file,
        string $disk = 'local'
    ) {
        return Storage::disk($disk)->putFileAs(
            dirname($archivo->relative_path),
            $file,
            basename($archivo->relative_path)
        );
    }

    public function storeFromRaw(
        Archivo $archivo,
        string $content,
        string $disk = 'local'
    ) {
        return Storage::disk($disk)->put(
            $archivo->relativePath,
            $content
        );
    }

    public function createAndStore(
        UploadedFile|File $file,
        string|null $fileName = null,
        ArchivoTipoEnum $tipo = ArchivoTipoEnum::PDF,
        string $disk = 'local'
    ): Archivo {
        if (is_null($fileName) && !($file instanceof UploadedFile)) {
            throw new InvalidArgumentException('You must provide the fileName when using a local File instance.');
        }

        $fileName = $fileName ?: $file->getClientOriginalName();

        $archivo = $this->create($fileName, $tipo);

        $this->store($archivo, $file, $disk);

        return $archivo;
    }

    public function createAndStoreFromRaw(
        string $fileName,
        string $content,
        ArchivoTipoEnum $tipo = ArchivoTipoEnum::PDF,
        string $disk = 'local'
    ): Archivo {
        $archivo = $this->create($fileName, $tipo);

        $this->storeFromRaw($archivo, $content, $disk);

        return $archivo;
    }
}
