<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\Disco\StoreDiscoFactorFormaRequest;
use App\Models\DiscoFactorForma;

class DiscoFactorFormaController extends Controller
{
    public function index()
    {
        return DiscoFactorForma::get()
            ->toResourceCollection();
    }

    public function store(StoreDiscoFactorFormaRequest $request)
    {
        return (DiscoFactorForma::create($request->validated()))
            ->toResourceResponse(201);
    }
}
