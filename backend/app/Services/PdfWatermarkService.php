<?php

namespace App\Services;

use Barryvdh\DomPDF\Facade\Pdf as DomPdf;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;
use mikehaertl\pdftk\Pdf as PdftkPdf;
use RuntimeException;

class PdfWatermarkService
{
    /**
     * Aplica la marca de agua a un PDF existente y genera el archivo de salida.
     * El PDF de marca de agua se genera al vuelo en cada llamada.
     */
    public function apply(string $sourcePath, string $outputPath, string $text, ?string $paper = 'a4'): string
    {
        if (! File::exists($sourcePath)) {
            throw new RuntimeException("El archivo origen no existe: {$sourcePath}");
        }

        $watermarkPath = $this->generateWatermarkPdf($text, $paper);

        try {
            File::ensureDirectoryExists(dirname($outputPath));

            $pdf = new PdftkPdf($sourcePath);

            if (! $pdf->stamp($watermarkPath)->saveAs($outputPath)) {
                throw new RuntimeException('pdftk falló al aplicar la marca de agua: '.$pdf->getError());
            }
        } finally {
            File::delete($watermarkPath);
        }

        return $outputPath;
    }

    public function generateWatermarkPdf(string $text, string $paper): string
    {
        $tmpPath = storage_path('app/tmp/watermark-'.Str::uuid().'.pdf');

        File::ensureDirectoryExists(dirname($tmpPath));

        DomPdf::loadView('pdf-view::watermark-stamp', [
                'text' => $text,
            ])
            ->setPaper($paper)
            ->save($tmpPath);

        return $tmpPath;
    }
}
