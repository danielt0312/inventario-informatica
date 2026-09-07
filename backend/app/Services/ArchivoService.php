<?php

namespace App\Services;

use InvalidArgumentException;
use App\Models\Archivo;
use App\Enums\AvailableFileExtensions;
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
    public function __construct(
        protected PdfWatermarkService $pdfWatermarkService
    ) {}

    public function reloadMetadata(Archivo $archivo): void
    {
        $archivo->update([
            'size' => FacadeFile::size($this->getFullPath($archivo))
        ]);
    }

    public function getFullPath(Archivo $archivo): string
    {
        if (!$archivo->exists)
            throw new \LogicException('No se puede obtener el file path para una instancia que no exista');

        // todo definir si se utilizaran discos por posibilidad de conflicto
        return storage_path("app/private/{$archivo->relativePath}");
    }

    public function storeFile(Archivo $archivo, UploadedFile|File $file, string $disk = 'local'): string | false
    {
        $relativePath = $archivo->relative_path;

        return Storage::disk($disk)->putFileAs(
            dirname($relativePath),
            $file,
            basename($relativePath)
        );
    }

    public function storeFileFromRaw(Archivo $archivo, string $content, string $disk = 'local'): bool
    {
        return Storage::disk($disk)->put(
            $archivo->relativePath,
            $content
        );
    }

    public function createAndStoreFile(UploadedFile|File $file, string|null $fileName = null, string $disk = 'local'): Archivo
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

        $this->storeFile($archivo, $file, $disk);

        return $archivo;
    }

    public function createAndStoreFileFromRaw(string $content, string $fileName, string $extension, string $disk = 'local'): Archivo
    {
        $archivo = Archivo::create([
            'nombre' => $fileName,
            'size' => strlen($content),
            'extension' => $extension
        ]);

        $this->storeFileFromRaw($archivo, $content, $disk);

        return $archivo;
    }

    public function stream(Archivo $archivo, string $disk = 'local') {
        if (!Storage::disk($disk)->exists($archivo->relative_path)) {
            return response(status: 404);
        }

        return response()->stream(function () use ($archivo, $disk) {
            $stream = Storage::disk($disk)->readStream($archivo->relative_path);
            fpassthru($stream);

            if (is_resource($stream)) {
                fclose($stream);
            }
        }, 200, [
            'Content-Type' => Storage::disk($disk)->mimeType($archivo->relative_path),
            'Content-Disposition' => 'inline; filename="'. $archivo->nombre .'"'
        ]);
    }
}
