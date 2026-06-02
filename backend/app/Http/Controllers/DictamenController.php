<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

use App\Http\Requests\Dictamen\{
    DictamenRequest,
    StoreDictamenRequest,
    DictaminarDictamenRequest
};

use App\Models\{
    Archivo,
    Dictamen
};

use App\Enums\{
    DocumentoTipoEnum,
    DictamenEstadoEnum
};

class DictamenController extends Controller
{
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
            logger($data);

            $archivo = Archivo::createAndStore($request->file('archivo'));

            $documento = $archivo->documentos()->create([
                'tipo_id' => DocumentoTipoEnum::DICTAMEN->value
            ]);

            $oficio = $documento->oficios()->create([
                'folio' => $data['folio']
            ]);

            //todo obtener el jefe de departamento de DTI
            $user_id = 1;

            //todo generar el documento al que el dictamen depende en su creacion
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

    public function update(Request $request, Dictamen $dictamen)
    {
        //
    }

    public function destroy(Dictamen $dictamen)
    {
        //
    }

    public function dictaminar(DictaminarDictamenRequest $request, Dictamen $dictamen) {
        DB::transaction(function () use ($request, $dictamen) {
            foreach ($request->input('productos') as $productoData) {
                $dictamen->productos()
                    ->where('id', $productoData['id'])
                    ->update([
                        'caracteristicas' => $productoData['caracteristicas']
                    ]);
            }

            $dictamen->update([
                'estado_id' => DictamenEstadoEnum::EVIDENCIAR->value,
            ]);
        });

        return response(status: 201);
    }
}
