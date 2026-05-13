<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\DiscoTipo;
use App\Http\Requests\CatalogoRequest;

class DiscoTipoController extends Controller
{
    public function index()
    {
        $data = DiscoTipo::get();

        return response()->json(compact('data'));
    }

    public function store(CatalogoRequest $request) {
        $data = DiscoTipo::create($request->validated());

        return response()->json(compact('data'));
    }
}
