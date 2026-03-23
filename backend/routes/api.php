<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\{ProductoController, ProductoTipoController};

Route::middleware('auth:sanctum')->group(function () {
    Route::get('user', fn (Request $request) => $request->user());

    Route::apiResources([
        'producto_tipos' => ProductoTipoController::class,
        'productos' => ProductoController::class
    ]);
});
