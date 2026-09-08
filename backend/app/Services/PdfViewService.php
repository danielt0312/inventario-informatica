<?php

namespace App\Services;

use Barryvdh\DomPDF\Facade\Pdf as DomPdf;

class PdfViewService
{
    public function loadView(string $view, array $data = [], array $mergeData = [], ?string $encoding = null)
    {
        return DomPdf::loadView("pdf-view::$view", $data, $mergeData, $encoding);
    }
}
