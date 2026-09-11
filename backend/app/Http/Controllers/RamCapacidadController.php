<?php

namespace App\Http\Controllers;

use App\Http\Requests\Ram\StoreRamCapacidadRequest;
use App\Models\RamCapacidad;

class RamCapacidadController extends Controller
{
    public function index()
    {
        return RamCapacidad::get()
            ->toResourceCollection();
    }

    public function store(StoreRamCapacidadRequest $request)
    {
        return (RamCapacidad::create($request->validated()))
            ->toResourceResponse(201);
    }
}
