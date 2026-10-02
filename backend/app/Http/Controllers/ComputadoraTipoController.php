<?php

namespace App\Http\Controllers;

use App\Models\ComputadoraTipo;

class ComputadoraTipoController extends Controller
{
    public function index()
    {
        return ComputadoraTipo::get()
            ->toResourceCollection();
    }
}
