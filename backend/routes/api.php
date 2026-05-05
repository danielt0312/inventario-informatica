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
    ArticuloEstadoController
};

Route::middleware('auth:sanctum')->group(function () {
    Route::get('user', fn (Request $request) => response()->json(['data' => $request->user()]));

    Route::apiResources([
        'producto_categorias' => ProductoCategoriaController::class,
        'producto_tipos' => ProductoTipoController::class,
        'producto_marcas' => ProductoMarcaController::class,
        'productos' => ProductoController::class,
        'articulos' => ArticuloController::class,
        'documentos' => DocumentoController::class
    ]);

    Route::get('documento_tipos', [DocumentoTipoController::class, 'index']);
    Route::get('articulo_estados', [ArticuloEstadoController::class, 'index']);
});
