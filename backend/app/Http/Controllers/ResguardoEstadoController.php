<?php

namespace App\Http\Controllers;

use App\Models\ResguardoEstado;

class ResguardoEstadoController extends Controller
{
    public function index()
    {
        return ResguardoEstado::get()
            ->toResourceCollection();
    }
}
