<?php

namespace App\Http\Controllers;

use App\Http\Requests\Ram\StoreRamTipoRequest;
use App\Models\RamTipo;

class RamTipoController extends Controller
{
    public function index()
    {
        return RamTipo::get()
            ->toResourceCollection();
    }

    public function store(StoreRamTipoRequest $request)
    {
        return (RamTipo::create($request->validated()))
            ->toResourceResponse(201);
    }
}
