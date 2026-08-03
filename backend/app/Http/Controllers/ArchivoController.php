<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\{DB, Storage};

use App\Models\Archivo;
use App\Http\Requests\Archivo\StoreArchivoRequest;

class ArchivoController extends ArchivableController
{
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
        if (!Storage::disk('local')->exists($archivo->relative_path)) {
            return response(status: 404);
        }

        return response()->stream(function () use ($archivo) {
            $stream = Storage::disk('local')->readStream($archivo->relative_path);
            fpassthru($stream);

            if (is_resource($stream)) {
                fclose($stream);
            }
        }, 200, [
            'Content-Type' => Storage::disk('local')->mimeType($archivo->relative_path),
            'Content-Disposition' => 'inline; filename="'. $archivo->nombre .'"'
        ]);
    }
}
