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
    ArticuloEstadoController,
    DictamenController,
    DictamenEstadoController,
    EmpleadoController,
    AdscripcionController,
    ArchivoController,
    FacturaController
};

// todo organizar las apiResource(s)
Route::middleware('auth:sanctum')->group(function () {
    Route::get('user', fn (Request $request) => response()->json(['data' => $request->user()]));

    Route::apiResources([
        'producto_categorias' => ProductoCategoriaController::class,
        'producto_tipos' => ProductoTipoController::class,
        'producto_marcas' => ProductoMarcaController::class,
        'productos' => ProductoController::class,
        'articulos' => ArticuloController::class
    ]);

    Route::apiResource('documentos', DocumentoController::class)
        ->only(['index']);

    Route::apiResource('facturas', FacturaController::class);

    Route::get('archivos/{archivo}/stream', [ArchivoController::class, 'stream']);

    Route::name('dictamenes.')
        ->prefix('dictamenes')
        ->group(function () {
            Route::apiResource('', DictamenController::class)
                ->only(['index', 'store']);
            Route::get('{dictamen}', [DictamenController::class, 'show'])
                // ->whereUuid('uuid')
                ->name('show');
            Route::controller(DictamenController::class)
                ->prefix('{dictamen}')
                ->group(function () {
                    foreach (['dictaminar', 'evidenciar', 'surtir', 'inventariar'] as $action) {
                        Route::post($action, $action)->name($action);
                    }
                });
        });

    Route::apiResources([
        'documento_tipos' => DocumentoTipoController::class,
        'articulo_estados' => ArticuloEstadoController::class,
        'dictamen_estados' => DictamenEstadoController::class,
        'empleados' => EmpleadoController::class,
        'adscripciones' => AdscripcionController::class
    ], ['only' => 'index']);
});
