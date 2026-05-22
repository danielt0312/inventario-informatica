<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\DictamenEstado;

class DictamenEstadoController extends Controller
{
    public function index()
    {
        $data = DictamenEstado::get();

        return response()->json(compact('data'));
    }
}
