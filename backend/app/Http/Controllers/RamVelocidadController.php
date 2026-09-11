<?php

namespace App\Http\Controllers;

use App\Http\Requests\Ram\StoreRamVelocidadRequest;
use App\Models\RamVelocidad;

class RamVelocidadController extends Controller
{
    public function index()
    {
        return RamVelocidad::get()
            ->toResourceCollection();
    }

    public function store(StoreRamVelocidadRequest $request)
    {
        return (RamVelocidad::create($request->validated()))
            ->toResourceResponse(201);
    }
}
