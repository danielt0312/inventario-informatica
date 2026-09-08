<?php

namespace App\Services;

use InvalidArgumentException;
use App\Models\Archivo;
use Illuminate\Support\Facades\{
    Storage,
    File as FacadeFile
};
use Illuminate\Http\{
    File,
    UploadedFile,
};

class ArchivoService
{
    public function fileExists(Archivo $archivo): bool
    {
        return Storage::exists($archivo->relative_path);
    }

    public function getFile(Archivo $archivo): string | null
    {
        return Storage::get($archivo->relative_path);
    }

    public function refreshMetadata(Archivo $archivo): void
    {
        $archivo->update([
            'size' => FacadeFile::size($this->getFullPath($archivo))
        ]);
    }

    public function getFullPath(Archivo $archivo): string
    {
        if (!$archivo->exists) {
            throw new \LogicException('No se puede obtener el file path para una instancia que no existe.');
        }

        // todo definir si se utilizaran discos por posibilidad de conflicto
        return Storage::path($archivo->relativePath);
    }

    public function storeFile(Archivo $archivo, UploadedFile|File $file): string | false
    {
        $relativePath = $archivo->relative_path;

        return Storage::putFileAs(
            dirname($relativePath),
            $file,
            basename($relativePath)
        );
    }

    public function storeFileFromRaw(Archivo $archivo, string $contents): bool
    {
        return Storage::put(
            $archivo->relativePath,
            $contents
        );
    }

    public function createAndStoreFile(UploadedFile|File $file, ?string $fileName = null): Archivo
    {
        $fileName ??= pathinfo(
            $file instanceof UploadedFile
                ? $file->getClientOriginalName()
                : $file->getFileName(),
            PATHINFO_FILENAME
        );

        $archivo = Archivo::create([
            'nombre' => $fileName,
            'size' => $file->getSize(),
            'extension' => $file->extension()
        ]);

        $this->storeFile($archivo, $file);

        return $archivo;
    }

    public function createAndStoreFileFromRaw(string $contents, string $fileName, string $extension): Archivo
    {
        $archivo = Archivo::create([
            'nombre' => $fileName,
            'size' => strlen($contents),
            'extension' => $extension
        ]);

        $this->storeFileFromRaw($archivo, $contents);

        return $archivo;
    }

    public function stream(Archivo $archivo)
    {
        if (! $this->fileExists($archivo)) {
            return response(status: 404);
        }

        return response()->stream(function () use ($archivo) {
            $stream = Storage::readStream($archivo->relative_path);
            fpassthru($stream);

            if (is_resource($stream)) {
                fclose($stream);
            }
        }, 200, [
            'Content-Type' => Storage::mimeType($archivo->relative_path),
            'Content-Disposition' => 'inline; filename="'. $archivo->nombre .'"'
        ]);
    }

}
