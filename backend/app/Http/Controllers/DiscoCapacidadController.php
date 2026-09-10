<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\Disco\StoreDiscoCapacidadRequest;
use App\Models\DiscoCapacidad;

class DiscoCapacidadController extends Controller
{
    public function index()
    {
        return DiscoCapacidad::get()
            ->toResourceCollection();
    }

    public function store(StoreDiscoCapacidadRequest $request)
    {
        return (DiscoCapacidad::create($request->validated()))
            ->toResourceResponse(201);
    }
}
