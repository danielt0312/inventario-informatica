<?php

namespace App\Services;

class DocumentoService extends ArchivoService
{
    public function __construct(
        protected ArchivoService $archivoService
    ) {}

    
}
