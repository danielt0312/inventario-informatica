<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

use App\Services\ArchivoService;
use App\Models\Factura;
use App\Enums\DocumentoTipoEnum;
use App\Http\Requests\Factura\StoreFacturaRequest;

class FacturaController extends Controller
{
    public function __construct(
        protected ArchivoService $archivoService
    ) {}

    public function index(Request $request)
    {
        return Factura::with(['documento.archivo'])
            ->paginate($request->query('per_page', 10))
            ->toResourceCollection();
    }

    public function store(StoreFacturaRequest $request)
    {
        DB::transaction(function () use ($request) {
            $archivo = $this->archivoService->createAndStore($request->file('archivo'));

            $documento = $archivo->documento()->create([
                'tipo_id' => DocumentoTipoEnum::FACTURA->value
            ]);

            $documento->factura()->create([
                'fecha_emision' => $request->input('fecha_emision')
            ]);
        });

        return response(status: 201);
    }
}
