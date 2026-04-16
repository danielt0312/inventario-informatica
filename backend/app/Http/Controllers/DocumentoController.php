<?php

namespace App\Http\Controllers;

use App\Models\Documento;
use Illuminate\Http\Request;
use App\Http\Requests\Documento\DocumentoRequest;

class DocumentoController extends Controller
{
    public function index(DocumentoRequest $request)
    {
        $data = Documento::where($request->validated())
            ->with(['tipo', 'archivo'])
            ->get();

        return response()->json(compact('data'));
    }

    public function store(Request $request)
    {
        //
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
