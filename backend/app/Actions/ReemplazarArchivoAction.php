<?php

namespace App\Actions;

use App\Models\Archivo;
use App\Services\ArchivoService;

final class CancelarArchivoAction
{
    public function __construct(
        protected ArchivoService $service,
    ) {}

    public function __invoke(Archivo $target, Archivo $replacer): void
    {
        if ($target->extension !== $replacer->extension) {
            throw new \InvalidArgumentException('Las extensiones de los archivos deben ser las mismas para poder reemplazarse.');
        }

        $replacerFileContents = $this->service->getFile($replacer);

        $this->service->storeFileFromRaw(
            $target,
            $replacerFileContents
        );

        $this->service->refreshMetadata($target);
        $replacer->destroy();
    }
}
