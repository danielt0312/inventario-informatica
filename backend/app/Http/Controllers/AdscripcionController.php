<?php

namespace App\Http\Controllers;

class AdscripcionController extends Controller
{
    public function index()
    {
        // todo cambiar por consulta real
        $data = [];
        for ($i=1; $i < 10; $i++) {
            $data[] = [
                'id' => $i,
                'externo_adscripcion_id' => $i,
                'nombre' => fake()->jobTitle(),
            ];
        }

        return response()->json(compact('data'));
    }
}
