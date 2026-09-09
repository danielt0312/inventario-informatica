<?php

namespace App\Actions;

use App\Models\Archivo;
use App\Services\ArchivoService;

final class ReemplazarArchivoAction
{
    public function __construct(
        protected ArchivoService $service,
    ) {}

    public function __invoke(Archivo $target, Archivo $replacer): void
    {
        $this->handle($target, $replacer);
    }

    public function handle(Archivo $target, Archivo $replacer): void
    {
        if ($this->service->mimeType($target) !== $this->service->mimeType($replacer)) {
            throw new \InvalidArgumentException('Los archivos deben ser del mismo tipo para poder reemplazarse.');
        }

        $this->service->replaceFile($target, $replacer);
    }
}
