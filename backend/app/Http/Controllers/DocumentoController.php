<?php

namespace App\Http\Controllers;

use App\Models\{Documento, Archivo};
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Requests\Documento\{DocumentoRequest, StoreDocumentoRequest};
use App\Enums\ArchivoTipoEnum;

class DocumentoController extends Controller
{
    public function index(DocumentoRequest $request)
    {
        $query = Documento::with(['archivo', 'tipo']);

        if ($request->filled('archivo_nombre'))
            $query->whereHas('archivo', fn ($q)
                => $q->whereLike('nombre', "%{$request->input('archivo_nombre')}%"));

        if ($request->filled('tipos'))
            $query->whereHas('tipo', fn ($q)
                => $q->whereIn('id', $request->input('tipos')));

        $data = $query->paginate($request->query('per_page', 10));

        return response()->json($data);
    }

    public function store(StoreDocumentoRequest $request)
    {
        DB::transaction(function () use ($request) {
            $file = $request->file('archivo');
            $filename = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);

            $archivo = Archivo::create([
                'nombre' => $filename,
                'tipo_id' => ArchivoTipoEnum::PDF->value
            ]);

            $fullPath = $archivo->relative_path;
            $directory = dirname($fullPath);
            $finalName = basename($fullPath);

            $file->storeAs($directory, $finalName);

            $documento = new Documento([
                'tipo_id' => $request->input('tipo_id'),
            ]);

            $documento->archivo()->associate($archivo);
            $documento->save();
        });

        return response(status: 201);
    }

    public function show(Documento $documento)
    {
        //
    }

    public function update(Request $request, Documento $documento)
    {
        //
    }

    public function destroy(Documento $documento)
    {
        //
    }
}
