<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\Disco\StoreDiscoTipoRequest;
use App\Models\DiscoTipo;

class DiscoTipoController extends Controller
{
    public function index()
    {
        return DiscoTipo::get()
            ->toResourceCollection();
    }

    public function store(StoreDiscoTipoRequest $request)
    {
        return (DiscoTipo::create($request->validated()))
            ->toResourceResponse(201);
    }
}
