<?php

namespace App\Http\Controllers;

use Illuminate\Http\File;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Barryvdh\DomPDF\Facade\Pdf;

use App\Services\ArchivoService;

use App\Http\Requests\Dictamen\{
    DictamenRequest,
    StoreDictamenRequest,
    DictaminarDictamenRequest,
    EvidenciarDictamenRequest
};

use App\Models\Dictamen;

use App\Enums\{
    DocumentoTipoEnum,
    DictamenEstadoEnum
};

class DictamenController extends Controller
{
    public function __construct(
        protected ArchivoService $archivoService
    ) {}

    public function index(DictamenRequest $request)
    {
        $query = Dictamen::with(['estado', 'oficio.documento.archivo', 'documento.archivo']);

        if ($request->filled('folio')) {
            $query->whereHas('oficio', fn ($q)
                => $q->whereLike('folio', "%{$request->input('folio')}%"));
        }

        $data = $query->paginate($request->query('per_page', 10));

        return response()->json($data);
    }

    public function store(StoreDictamenRequest $request)
    {
        DB::transaction(function () use ($request) {
            $data = $request->validated();

            $archivo = $this->archivoService->createAndStore($request->file('archivo'));

            $documento = $archivo->documentos()->create([
                'tipo_id' => DocumentoTipoEnum::OFICIO->value
            ]);

            $oficio = $documento->oficios()->create([
                'folio' => $data['folio']
            ]);

            //todo obtener el jefe de departamento de DTI
            $user_id = 1;

            //todo verificar que la adscripcion exista en la tabla espejo `Adscripcion`
            $dictamen = Dictamen::create([
                'oficio_id' => $oficio->id,
                'adscripcion_id' => $data['adscripcion_id'],
                'user_id' => $user_id,
                'fecha_solicitud' => $data['fecha_solicitud']
            ]);

            //todo verificar que los empleados existan en la tabla espejo `Empleado`
            $dictamen->productos()->createMany($data['productos']);
        });

        return response(status: 201);
    }

    public function show(Dictamen $dictamen)
    {
        $dictamen->load([
            'estado',
            'oficio.documento.archivo.tipo',
            'documento.archivo.tipo',
            'productos.producto.tipo.categoria',
            'productos.producto.marca'
        ]);

        return response()->json(['data' => $dictamen]);
    }

    public function dictaminar(DictaminarDictamenRequest $request, Dictamen $dictamen)
    {
        DB::transaction(function () use ($request, $dictamen) {
            foreach ($request->input('productos') as $productoData) {
                $dictamen->productos()
                    ->where('id', $productoData['id'])
                    ->update([
                        'caracteristicas' => $productoData['caracteristicas']
                    ]);
            }

            $pdf = Pdf::loadView('pdf-view::dictamen', compact('dictamen'));

            $archivo = $this->archivoService->createAndStoreFromRaw(
                DocumentoTipoEnum::DICTAMEN->nombre(),
                $pdf->output()
            );

            $documento = $archivo->documentos()->create([
                'tipo_id' => DocumentoTipoEnum::DICTAMEN->value
            ]);

            $dictamen->update([
                'documento_id' => $documento->id,
                'estado_id' => DictamenEstadoEnum::EVIDENCIAR->value
            ]);
        });

        return response(status: 201);
    }

    public function evidenciar(EvidenciarDictamenRequest $request, Dictamen $dictamen)
    {
        $this->archivoService->store(
            $dictamen->documento->archivo,
            $request->file('archivo')
        );

        $dictamen->update([
            'estado_id' => DictamenEstadoEnum::SURTIR->value
        ]);

        return response(status: 201);
    }

    public function facturar(FacturarDictamenRequest $request, Dictamen $dictamen)
    {
        // DB::transaction(function () use ($request, $dictamen) {
        //     foreach ($request->input('productos') as $productoData) {
        //         $dictamen->articulos()
        //             ->createMany();
        //     }

        //     $dictamen->update([
        //         'estado_id' => DictamenEstadoEnum::EVIDENCIAR->value,
        //     ]);
        // });

        return response(status: 201);
    }
}
