<?php

namespace App\Http\Controllers;

use App\Models\Resguardo;
use Illuminate\Http\Request;

use Spatie\QueryBuilder\QueryBuilder;

class ResguardoController extends Controller
{
    public function index(Request $request)
    {
        return QueryBuilder::for(Resguardo::class)
            // ->with('empleado')
            ->paginate($request->query('per_page', 10))
            ->toResourceCollection();
    }

    public function store(Request $request)
    {
        //
    }

    public function show(Resguardo $resguardo)
    {
        //
    }

    public function update(Request $request, Resguardo $resguardo)
    {
        //
    }
}
