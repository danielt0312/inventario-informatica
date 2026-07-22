<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\OrdenCompra;

class OrdenCompraController extends Controller
{
    public function index(Request $request)
    {
        return OrdenCompra::with('documento')
            ->paginate($request->query('per_page', 10))
            ->toResourceCollection();
    }

    public function store()
    {
        return;
    }
}
