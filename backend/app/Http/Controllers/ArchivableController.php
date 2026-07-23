<?php

namespace App\Http\Controllers;

use App\Services\ArchivoService;

class ArchivableController extends Controller
{
    public function __construct(
        protected ArchivoService $archivoService
    ) {
    }
}
