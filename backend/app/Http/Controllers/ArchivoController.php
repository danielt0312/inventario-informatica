<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

use App\Models\Archivo;

class ArchivoController extends Controller
{
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
