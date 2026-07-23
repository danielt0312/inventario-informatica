<?php

namespace App\Http\Controllers;

use App\Models\Documento;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Spatie\QueryBuilder\{AllowedFilter, QueryBuilder};

class DocumentoController extends Controller
{
    public function index(Request $request)
    {
        return QueryBuilder::for(Documento::class)
            ->with('tipo')
            ->allowedFilters(
                AllowedFilter::exact('tipos', 'tipo_id'),
                AllowedFilter::partial('archivo', 'archivo.nombre')
            )
            ->paginate($request->query('per_page', 10))
            ->toResourceCollection();
    }
}
