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
    FacturaController,
    OrdenCompraController,
    ProveedorController,
};

Route::middleware('auth:sanctum')->group(function () {
    // todo definir si se cambiara a español o inglés
    Route::get('user', fn (Request $request) => response()->json(['data' => $request->user()]));

    Route::get('archivos/{archivo}/stream', [ArchivoController::class, 'stream']);
    Route::apiResources([
        'documentos' => DocumentoController::class,
        'documento_tipos' => DocumentoTipoController::class,
        'articulo_estados' => ArticuloEstadoController::class,
        'dictamen_estados' => DictamenEstadoController::class,
        'empleados' => EmpleadoController::class,
        'adscripciones' => AdscripcionController::class,
        'articulos' => ArticuloController::class
    ], ['only' => 'index']);

    Route::apiResources([
        'producto_categorias' => ProductoCategoriaController::class,
        'producto_tipos' => ProductoTipoController::class,
        'producto_marcas' => ProductoMarcaController::class,
        'productos' => ProductoController::class,
        'orden_compras' => OrdenCompraController::class,
        'facturas' => FacturaController::class,
        'proveedores' => ProveedorController::class,
    ], ['only' => ['index', 'store']]);

    Route::name('dictamenes.')
        ->prefix('dictamenes')
        ->group(function () {
            Route::apiResource('', DictamenController::class)
                ->only(['index', 'store']);

            Route::get('{uuid}', [DictamenController::class, 'show'])
                ->whereUuid('uuid')
                ->name('show');

            Route::controller(DictamenController::class)
                ->prefix('{dictamen}')
                ->group(function () {
                    foreach (['dictaminar', 'evidenciar', 'surtir', 'inventariar'] as $action) {
                        Route::post($action, $action)->name($action);
                    }
                });
        });
});
