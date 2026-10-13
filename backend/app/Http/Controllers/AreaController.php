<?php

namespace App\Http\Controllers;

use App\Models\Area;

class AreaController extends Controller
{
    public function index()
    {
        // todo cambiar por consulta real
        return Area::factory()
            ->withId()
            ->count(9)
            ->make()
            ->sort()
            ->toResourceCollection();
    }
}
