<?php

namespace App\Http\Controllers;

use App\Models\{Documento, Archivo};
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Requests\Documento\StoreDocumentoRequest;
use App\ArchivoTipoEnum;

class DocumentoController extends Controller
{
    public function index()
    {
        $data = Documento::with(['tipo', 'archivo'])
            ->get();

        return response()->json(compact('data'));
    }

    public function store(StoreDocumentoRequest $request)
    {
        DB::transaction(function ($request) {
            $file = $request->archivo;
            $filename = $file->getClientOriginalName();

            $archivo = Archivo::create([
                'nombre' => $filename,
                'tipo_id' => ArchivoTipoEnum::PDF->value
            ]);

            $file->storeAs('');

            $documento = new Documento([
                'tipo_id' => $request->input('tipo_id'),
            ]);

            $documento->archivo()->associate($archivo);
            $documento->save();
        });
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
