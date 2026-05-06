<?php

namespace App\Http\Controllers;

use App\Enums\ArticuloEstadoEnum;

class ArticuloEstadoController extends Controller
{
    public function index() {
        $data = ArticuloEstadoEnum::toFormattedArray();

        return response()->json(compact('data'));
    }
}
