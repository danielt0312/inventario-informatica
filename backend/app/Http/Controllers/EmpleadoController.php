<?php

namespace App\Http\Controllers;

use App\Models\Empleado;

class EmpleadoController extends Controller
{
    public function index()
    {
        // todo cambiar por consulta real
        return Empleado::factory()
            ->withId()
            ->count(9)
            ->make()
            ->sort()
            ->toResourceCollection();
    }
}
