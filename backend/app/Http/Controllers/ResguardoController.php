<?php

namespace App\Http\Controllers;

use App\Models\Resguardo;
use App\Services\ResguardoService;
use Illuminate\Http\Request;

use Spatie\QueryBuilder\{
    QueryBuilder,
    AllowedFilter
};

class ResguardoController extends Controller
{
    public function index(Request $request, \App\Services\ArchivoService $archivoService)
    {
        $resguardo = Resguardo::with([
            'articulosResguardados.articulo.producto' => [
                'tipo.categoria', 'marca'
            ]
        ])->find(1);
        $pdfTitle = \App\Enums\DocumentoTipoEnum::RESGUARDO->getLabelValue();
        $pdf = \Barryvdh\DomPDF\Facade\Pdf::loadView('pdf-view::resguardo', ['resguardo' => $resguardo, 'title' => $pdfTitle, 'fileTitle' => $pdfTitle]);
        $archivoService->storeFileFromRaw(
            $resguardo->archivo,
            $pdf->output(),
        );

        return QueryBuilder::for(Resguardo::class)
            ->with('estado', 'archivo')
            ->defaultSort('-fecha_actualizacion')
            ->allowedSorts('fecha_actualizacion')
            ->allowedFilters(
                AllowedFilter::belongsTo('estado'),
                // TODO realizar filtrados por empleado y adscripción (de empleado)
                // AllowedFilter::exact('empleado', 'empleado_id'),
                // AllowedFilter::exact('adscripcion', 'empleado.adscripcion_id'),
            )
            ->paginate($request->query('per_page', 10))
            ->toResourceCollection();
    }
}
