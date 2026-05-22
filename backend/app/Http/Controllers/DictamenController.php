<?php

namespace App\Http\Controllers;

use App\Models\Dictamen;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

use App\Http\Requests\Dictamen\{
    DictamenRequest,
    StoreDictamenRequest
};

use App\Models\{
    Dictamen,
    DictamenProducto
};

use App\Enums\{

};

class DictamenController extends Controller
{
    public function index(DictamenRequest $request)
    {
        $query = Dictamen::with(['estado', 'oficio', 'documento']);

        $data = $query->paginate($request->query('per_page', 10));

        return response()->json($data);
    }

    public function store(StoreDictamenRequest $request)
    {
        DB::transaction(function () use ($request) {
            $archivo = Archivo::create([
                'nombre'
            ]);
        });

        return response(status: 201);
    }

    public function show(Dictamen $dictamen)
    {
        //
    }

    public function update(Request $request, Dictamen $dictamen)
    {
        //
    }

    public function destroy(Dictamen $dictamen)
    {
        //
    }
}
