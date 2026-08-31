<?php

namespace App\Http\Controllers;

use App\Models\Adscripcion;

class AdscripcionController extends Controller
{
    public function index()
    {
        // todo cambiar por consulta real
        return Adscripcion::factory()
            ->count(8)
            ->make()
            ->toResourceCollection();
    }
}
