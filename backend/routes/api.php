<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\{
    ProductoController,
    ProductoCategoriaController,
    ProductoTipoController,
    ProductoMarcaController,
    ArticuloController,
    DocumentoController,
    DocumentoTipoController,
    // DiscoController,
    DiscoTipoController,
    ArticuloEstadoController,
    DictamenController,
    DictamenEstadoController,
    EmpleadoController,
    AdscripcionController
};

Route::middleware('auth:sanctum')->group(function () {
    Route::get('user', fn (Request $request) => response()->json(['data' => $request->user()]));

    Route::apiResources([
        'producto_categorias' => ProductoCategoriaController::class,
        'producto_tipos' => ProductoTipoController::class,
        'producto_marcas' => ProductoMarcaController::class,
        'productos' => ProductoController::class,
        'articulos' => ArticuloController::class,
    ]);

    Route::apiResource('dictamenes', DictamenController::class)
        ->parameters(['dictamenes' => 'dictamen:uuid']);

    Route::apiResources([
        'documento_tipos' => DocumentoTipoController::class,
        'articulo_estados' => ArticuloEstadoController::class,
        'dictamen_estados' => DictamenEstadoController::class,
        'empleados' => EmpleadoController::class,
        'adscripciones' => AdscripcionController::class
    ], ['only' => 'index']);

    Route::apiResources([
        // 'discos' => DiscoController::class,
        'disco_tipos' => DiscoTipoController::class
    ], ['except' => 'show']);
});
