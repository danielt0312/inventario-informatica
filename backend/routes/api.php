<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers;

Route::post('login', [Controllers\LoginController::class, 'authenticate']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('user', fn (Request $request) =>  $request->user());
});
