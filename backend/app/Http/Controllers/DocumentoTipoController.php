<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\DocumentoTipoEnum;

class DocumentoTipoController extends Controller
{
    public function index() {
        $data = array_map(
            fn (DocumentoTipoEnum $v) => ['id' => $v->value, 'nombre' => $v->nombre()],
            DocumentoTipoEnum::cases()
        );

        return response()->json(compact('data'));
    }
}
