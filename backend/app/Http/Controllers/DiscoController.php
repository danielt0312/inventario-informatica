<?php

namespace App\Http\Controllers;

use App\Models\ProductoVariante;
use App\Enums\ProductoTipoEnum;
use App\Services\DiscoService;
use App\Data\Disco\StoreDiscoData;
use App\Http\Requests\Disco\StoreDiscoRequest;
use App\Http\Resources\DiscoResource;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class DiscoController extends Controller
{
    public function __construct(
        protected DiscoService $discoService
    ) {}

    public function index()
    {
        return ProductoVariante::query()
            ->whereHas('producto', fn ($q) => $q->where('tipo_id', ProductoTipoEnum::Disco->value))
            ->with([
                'producto.marca',
                'variante' => function (MorphTo $morphTo) {
                    $morphTo->morphWith([
                        Disco::class => ['tipo', 'capacidad', 'interfaz', 'factorForma'],
                    ]);
                },
            ])
            ->get()
            ->toResourceCollection(DiscoResource::class);
    }

    public function store(StoreDiscoRequest $request)
    {
        return $this->discoService->crear(StoreDiscoData::from($request->validated()))
            ->load('producto.marca')
            ->toResourceResponse(201, DiscoResource::class);
    }
}
