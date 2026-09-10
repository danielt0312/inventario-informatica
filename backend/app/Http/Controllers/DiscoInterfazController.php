<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\Disco\StoreDiscoInterfazRequest;
use App\Models\DiscoInterfaz;

class DiscoInterfazController extends Controller
{
    public function index()
    {
        return DiscoInterfaz::get()
            ->toResourceCollection();
    }

    public function store(StoreDiscoInterfazRequest $request)
    {
        return (DiscoInterfaz::create($request->validated()))
            ->toResourceResponse(201);
    }
}
