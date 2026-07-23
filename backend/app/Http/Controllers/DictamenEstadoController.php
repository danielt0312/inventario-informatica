<?php

namespace App\Http\Controllers;

use App\Models\DictamenEstado;

class DictamenEstadoController extends Controller
{
    public function index()
    {
        return DictamenEstado::get()
            ->toResourceCollection();
    }
}
