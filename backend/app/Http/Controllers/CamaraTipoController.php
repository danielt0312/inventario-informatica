<?php

namespace App\Http\Controllers;

use App\Models\CamaraTipo;

class CamaraTipoController extends Controller
{
    public function index()
    {
        return CamaraTipo::get()
            ->toResourceCollection();
    }
}
