<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\{ProductoCategoriaController, ProductoTipoController, ProductoMarcaController};

Route::middleware('auth:sanctum')->group(function () {
    Route::get('user', fn (Request $request) => $request->user());

    Route::apiResources([
        'producto_categorias' => ProductoCategoriaController::class,
        'producto_tipos' => ProductoTipoController::class,
        'producto_marcas' => ProductoMarcaController::class,
    ]);
});
