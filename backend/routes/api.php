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
    ArchivoTemporalController,
    FacturaController,
    OrdenCompraController,
    ProveedorController,
    ResguardoController,
    ResguardoEstadoController,
    EmpleadoResguardoController,
    EmpleadoResguardoActualController,
};

Route::middleware('auth:sanctum')->group(function () {
    // todo definir si se cambiara a español o inglés
    Route::get('user', fn (Request $request) => response()->json(['data' => $request->user()]));

    Route::apiResource('archivos', ArchivoController::class)
        ->only(['show', 'store']);
    Route::get('archivos/{archivo}/stream', [ArchivoController::class, 'stream'])
        ->name('archivos.stream');

    Route::apiResources([
        'documentos' => DocumentoController::class,
        'documento_tipos' => DocumentoTipoController::class,
        'articulo_estados' => ArticuloEstadoController::class,
        'dictamen_estados' => DictamenEstadoController::class,
        'empleados' => EmpleadoController::class,
        'adscripciones' => AdscripcionController::class,
        'resguardo_estados' => ResguardoEstadoController::class,
    ], ['only' => 'index']);

    Route::apiResources([
        'articulos' => ArticuloController::class,
    ], ['only' => ['index', 'show']]);

    Route::apiResources([
        'producto_categorias' => ProductoCategoriaController::class,
        'producto_tipos' => ProductoTipoController::class,
        'producto_marcas' => ProductoMarcaController::class,
        'productos' => ProductoController::class,
        'orden_compras' => OrdenCompraController::class,
        'facturas' => FacturaController::class,
        'proveedores' => ProveedorController::class,
    ], ['only' => ['index', 'store']]);

    // TODO definir si el parametro sera un id, uuid, u otro como identificable del empleado
    // TODO definir si un empleado puede ver los resguardos de otros (permisos de usuario)
    Route::apiResource('empleados.resguardos', EmpleadoResguardoController::class)
        ->only(['index'])
        ->parameters(['empleados' => 'empleadoId']);

    Route::name('empleados.resguardo-actual.')
        ->prefix('empleados/{empleadoId}/resguardo-actual')
        ->group(function () {
            Route::apiResource('', EmpleadoResguardoActualController::class)
                ->only(['index']);
            Route::post('', [EmpleadoResguardoActualController::class, 'actualizar'])
                ->name('actualizar');
        });

    Route::name('resguardos.')
        ->prefix('resguardos')
        ->group(function () {
            Route::apiResource('', ResguardoController::class)
                ->only(['index', 'show'])
                ->parameters(['' => 'uuid']);

            Route::prefix('{resguardo}')
                ->group(function () {
                    Route::post('cancelar', [ResguardoController::class, 'cancelar'])
                        ->name('cancelar');
                });
        });

    Route::name('dictamenes.')
        ->prefix('dictamenes')
        ->group(function () {
            Route::apiResource('', DictamenController::class)
                ->only(['index', 'store', 'update'])
                ->parameters(['' => 'dictamen']);

            Route::get('{uuid}', [DictamenController::class, 'show'])
                ->whereUuid('uuid')
                ->name('show');

            Route::controller(DictamenController::class)
                ->prefix('{dictamen}')
                ->group(function () {
                    foreach (['dictaminar', 'surtir', 'inventariar'] as $action) {
                        Route::post($action, $action)->name($action);
                    }

                    Route::post('evidenciar-acuse', 'evidenciarAcuse')->name('evidenciar-acuse');
                });
        });
});
