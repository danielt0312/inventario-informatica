<?php

namespace App\Services;

use InvalidArgumentException;
use App\Models\Archivo;
use App\Enums\AvailableFileExtensions;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\{
    File,
    UploadedFile,
};

class ArchivoService
{
    public function getFullPath(Archivo $archivo): string
    {
        if (!$archivo->exists)
            throw new \LogicException('No se puede obtener el file path para una instancia que no exista');

        return storage_path("app/private/{$archivo->relativePath}");
    }

    public function create(array $fillable): Archivo
    {
        return Archivo::create($fillable);
    }

    public function storeFile(Archivo $archivo, UploadedFile|File $file, string $disk): string | false
    {
        return Storage::disk($disk)->putFileAs(
            dirname($archivo->relative_path),
            $file,
            basename($archivo->relative_path)
        );
    }

    public function storeFileFromRaw(Archivo $archivo, string $content, string $disk): bool
    {
        return Storage::disk($disk)->put(
            $archivo->relativePath,
            $content
        );
    }

    public function createAndStore(UploadedFile|File $file, string $disk, string|null $fileName = null): Archivo
    {
        $fileName ??= pathinfo(
            $file instanceof UploadedFile
                ? $file->guessClientOriginalName()
                : $file->getFileName(),
            PATHINFO_FILENAME
        );

        $archivo = $this->create([
            'nombre' => $fileName,
            'size' => $file->getSize(),
            'extension' => $file->extension()
        ]);

        $this->storeFile($archivo, $file, $disk);

        return $archivo;
    }

    public function createAndStoreFromRaw(string $fileName, string $content, string $extension, string $disk): Archivo
    {
        $archivo = $this->create([
            'nombre' => $fileName,
            'size' => strlen($content),
            'extension' => $extension
        ]);

        $this->storeFileFromRaw($archivo, $content, $disk);

        return $archivo;
    }
}
