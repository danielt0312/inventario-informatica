<?php

namespace App\Http\Controllers;

use App\Models\LicenciaTipo;

class LicenciaTipoController extends Controller
{
    public function index()
    {
        return LicenciaTipo::get()
            ->toResourceCollection();
    }
}
