<?php

namespace App\Http\Controllers;

use App\Http\Requests\Empleado\EmpleadoRequest;

class EmpleadoController extends Controller
{
    public function index(EmpleadoRequest $request)
    {
        // todo cambiar por consulta real
        $data = [];
        for ($i=1; $i < 10; $i++) {
            $empleado = [
                'nombre' => fake()->firstName(). ' ' . fake()->optional()->firstName(),
                'apellido_paterno' => fake()->lastName(),
                'apellido_materno' => fake()->optional()->lastName()
            ];

            $nombre_completo = implode(' ', array_filter($empleado));

            $data[] = [
                'id' => $i,
                'externo_empleado_id' => $i,
                'externo_adscripcion_id' => $i,
                'nombre_completo' => $nombre_completo,
                ...$empleado
            ];
        }

        return response()->json(compact('data'));
    }
}
