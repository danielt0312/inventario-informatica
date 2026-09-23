<?php

namespace App\Http\Controllers;

use App\Services\DiscoService;
use App\Data\Disco\StoreDiscoData;
use App\Http\Requests\Disco\StoreDiscoRequest;

class DiscoController extends Controller
{
    public function __construct(
        protected DiscoService $discoService
    ) {}

    public function store(StoreDiscoRequest $request)
    {
        $productoVariante = $this->discoService->crear(StoreDiscoData::from($request->validated()));

        logger(compact('productoVariante'));

        return $productoVariante
            ->toResourceResponse(201);
    }
}
