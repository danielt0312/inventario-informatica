<?php

namespace App\Actions;

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
