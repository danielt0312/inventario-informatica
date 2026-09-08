<?php

namespace App\Actions;

use App\Models\Archivo;
use App\Services\{
    ArchivoService,
    PdfWatermarkService
};

final class CancelarArchivoAction
{
    public function __construct(
        protected ArchivoService $archivoService,
        protected PdfWatermarkService $pdfWatermarkService,
    ) {}

    public function __invoke(Archivo $archivo, string $texto = 'CANCELADO'): void
    {
        $path = $this->archivoService->getFullPath($archivo);
        $this->pdfWatermarkService->apply($path, $path, $texto);
        $this->archivoService->reloadMetadata($archivo);
    }
}
