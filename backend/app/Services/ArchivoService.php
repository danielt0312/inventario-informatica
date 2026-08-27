<?php

namespace App\Services;

use App\Models\Archivo;
use App\Enums\AvailableFileExtensions;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\{File, UploadedFile};
use InvalidArgumentException;

class ArchivoService
{
    public function getFullPath(Archivo $archivo): string
    {
        if (!$archivo->exists)
            throw new \LogicException('No se puede obtener el file path para una instancia que no exista');

        return storage_path("app/private/{$archivo->relativePath}");
    }

    public function create(string $nombre, int $size, AvailableFileExtensions $tipo = AvailableFileExtensions::PDF): Archivo
    {
        return Archivo::create([
            'nombre' => pathinfo($nombre, PATHINFO_FILENAME),
            'size' => $size,
            'extension' => $tipo->value
        ]);
    }

    public function store(Archivo $archivo, UploadedFile|File $file, string $disk = 'local')
    {
        return Storage::disk($disk)->putFileAs(
            dirname($archivo->relative_path),
            $file,
            basename($archivo->relative_path)
        );
    }

    public function storeFromRaw(Archivo $archivo, string $content, string $disk = 'local')
    {
        return Storage::disk($disk)->put(
            $archivo->relativePath,
            $content
        );
    }

    public function createAndStore(UploadedFile|File $file, string|null $fileName = null, AvailableFileExtensions $tipo = AvailableFileExtensions::PDF, string $disk = 'local'): Archivo
    {
        if (is_null($fileName) && !($file instanceof UploadedFile)) {
            throw new InvalidArgumentException('You must provide `fileName` when using a `File` instance.');
        }

        $archivo = $this->create($fileName ?: $file->getClientOriginalName(), $file->getSize(), $tipo);

        $this->store($archivo, $file, $disk);

        return $archivo;
    }

    public function createAndStoreFromRaw(string $fileName, string $content, AvailableFileExtensions $tipo = AvailableFileExtensions::PDF, string $disk = 'local'): Archivo
    {
        $archivo = $this->create($fileName, strlen($content), $tipo);

        $this->storeFromRaw($archivo, $content, $disk);

        return $archivo;
    }
}
