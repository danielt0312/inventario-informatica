<?php

namespace App\Actions;

use App\Models\Archivo;
use App\Services\ArchivoService;

final class ReemplazarArchivoAction
{
    public function __construct(
        protected ArchivoService $archivoService
    ) {}

    public function __invoke(Archivo $target, Archivo $replacer): void
    {
        if ($this->archivoService->mimeType($target) !== $this->archivoService->mimeType($replacer)) {
            throw new \InvalidArgumentException('Los archivos deben ser del mismo tipo para poder reemplazarse.');
        }

        $this->archivoService->replaceFile($target, $replacer);
    }
}
