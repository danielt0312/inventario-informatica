<?php

namespace App\Http\Controllers;

use App\Models\ArticuloEstado;

class ArticuloEstadoController extends Controller
{
    public function index() {
        return ArticuloEstado::get()
            ->toResourceCollection();
    }
}
