<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\{DB, Storage};
use App\Models\Archivo;
use App\Services\ArchivoService;
use App\Http\Requests\Archivo\StoreArchivoRequest;


class ArchivoController extends Controller
{
    public function __construct(
        protected ArchivoService $archivoService
    ) {}

    public function store(StoreArchivoRequest $request)
    {
        $archivo = DB::transaction(function () use ($request): Archivo {
            $archivo = $this->archivoService->createAndStore($request->file('archivo'));

            $archivo->temporal()->create([
                'user_id' => $request->user()->id,
                'created_at' => now(),
                'expires_at' => now()->addDay(),
            ]);

            return $archivo;
        });

        return $archivo->toResource()
            ->response()
            ->setStatusCode(201);
    }

    public function stream(Archivo $archivo)
    {
        return $this->archivoService->stream($archivo);
    }
}
