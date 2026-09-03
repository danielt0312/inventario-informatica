<?php

namespace App\Services;

use RuntimeException;
use Barryvdh\DomPDF\Facade\Pdf as DomPdf;
use mikehaertl\pdftk\Pdf as PdftkPdf;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;

class PdfWatermarkService
{
    public function apply(string $sourcePath, string $outputPath, string $text, string $paper = 'a4'): string
    {
        if (! File::exists($sourcePath)) {
            throw new RuntimeException("El archivo origen no existe: {$sourcePath}");
        }

        $watermarkPath = $this->generate($text, $paper);

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

    public function generate(string $text, string $paper): string
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
