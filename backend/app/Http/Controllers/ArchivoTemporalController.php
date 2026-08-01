<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;

use App\Http\Requests\ArchivoTemporal\StoreArchivoTemporalRequest;

use App\Models\Archivo;

class ArchivoTemporalController extends ArchivableController
{
    public function store(StoreArchivoTemporalRequest $request)
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
}
