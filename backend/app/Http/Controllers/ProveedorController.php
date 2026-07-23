<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Proveedor;
use App\Http\Requests\Proveedor\StoreProveedorRequest;

class ProveedorController extends Controller
{
    public function index()
    {
        return Proveedor::get()
            ->toResourceCollection();
    }

    public function store(StoreProveedorRequest $request)
    {
        return (Proveedor::create($request->validated()))
            ->toResource()
            ->response()
            ->setStatusCode(201);
    }
}
