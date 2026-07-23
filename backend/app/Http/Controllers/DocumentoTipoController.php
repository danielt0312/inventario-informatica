<?php

namespace App\Http\Controllers;

use App\Models\DocumentoTipo;

class DocumentoTipoController extends Controller
{
    public function index() {
        return DocumentoTipo::get()
            ->toResourceCollection();
    }
}
