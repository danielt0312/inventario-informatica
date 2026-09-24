<?php

namespace App\Http\Controllers;

use App\Services\DiscoService;
use App\Data\Disco\StoreDiscoData;
use App\Http\Requests\Disco\StoreDiscoRequest;
use App\Http\Resources\DiscoResource;

class DiscoController extends Controller
{
    public function __construct(
        protected DiscoService $discoService
    ) {}

    public function store(StoreDiscoRequest $request)
    {
        return $this->discoService->crear(StoreDiscoData::from($request->validated()))
            ->load('producto.marca')
            ->toResourceResponse(201, DiscoResource::class);
    }
}
