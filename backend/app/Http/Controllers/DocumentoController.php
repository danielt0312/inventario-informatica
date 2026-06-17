<?php

namespace App\Http\Controllers;

use App\Models\{Documento, Archivo};
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Requests\Documento\{DocumentoRequest, StoreDocumentoRequest};
use App\Enums\AvailableFileExtensions;

class DocumentoController extends Controller
{
    public function index(DocumentoRequest $request)
    {
        $query = Documento::with(['tipo']);

        if ($request->filled('archivo')) {
            $query->whereHas('archivo', fn ($q)
                => $q->whereLike('nombre', "%{$request->input('archivo')}%"));
        }

        if ($request->filled('tipos')) {
            $query->whereHas('tipo', fn ($q)
                => $q->whereIn('id', $request->input('tipos')));
        }

        return $query
            ->paginate($request->query('per_page', 10))
            ->toResourceCollection();
    }
}
