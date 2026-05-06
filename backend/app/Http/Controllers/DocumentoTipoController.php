<?php

namespace App\Http\Controllers;

use App\Enums\DocumentoTipoEnum;

class DocumentoTipoController extends Controller
{
    public function index() {
        $data = DocumentoTipoEnum::toFormattedArray();

        return response()->json(compact('data'));
    }
}
