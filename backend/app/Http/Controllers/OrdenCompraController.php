<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

use App\Models\OrdenCompra;
use App\Services\ArchivoService;
use App\Enums\DocumentoTipoEnum;
use App\Http\Requests\OrdenCompra\StoreOrdenCompraRequest;

class OrdenCompraController extends Controller
{
    public function __construct(
        protected ArchivoService $archivoService
    ) {}

    public function index(Request $request)
    {
        return OrdenCompra::with(['documento', 'proveedor'])
            ->paginate($request->query('per_page', 10))
            ->toResourceCollection();
    }

    public function store(StoreOrdenCompraRequest $request)
    {
        $orden_compra = DB::transaction(function () use ($request): OrdenCompra {
            $archivo = $this->archivoService->createAndStore($request->file('archivo'));

            $documento = $archivo->documento()->create([
                'tipo_id' => DocumentoTipoEnum::ORDEN_COMPRA->value
            ]);

            return $orden_compra = $documento->ordenCompra()->create($request->validated());
        });

        return $orden_compra
            ->toResource()
            ->response()
            ->setStatusCode(201);
    }
}
