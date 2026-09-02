<?php

namespace App\Services;

use App\Enums\DocumentoTipoEnum;
use App\Models\{
    Resguardo,
    Archivo,
    Documento
};
use Barryvdh\DomPDF\Facade\Pdf as DomPdf;

class ResguardoService
{
    public function __construct(
        protected ArchivoService $archivoService
    ) { }

    public function generarPdf(Resguardo $resguardo, string $title, string $fileTitle)
    {
        return DomPdf::loadView('pdf-view::resguardo', compact('resguardo', 'title', 'fileTitle'));
    }

    public function crearArchivo(
        Resguardo $resguardo,
        ?string $title,
        ?string $fileTitle
    ): Archivo {
        $title ??= DocumentoTipoEnum::RESGUARDO->getLabelValue();
        $fileTitle ??= $title;

        $pdf = $this->generarPdf($resguardo, $title, $fileTitle);

        return $this->archivoService->createAndStoreFromRaw(
            $title,
            $pdf->output()
        );
    }

    public function crearDocumento (Resguardo $resguardo): Documento
    {
        return $this->crearArchivo($resguardo)
            ->documento()
            ->create([
                'tipo_id' => DocumentoTipoEnum::RESGUARDO->value
            ]);
    }
}
