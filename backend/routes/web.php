<?php

use Illuminate\Support\Facades\Route;

Route::controller(App\Http\Controllers\LoginController::class)->group(function () {
    Route::middleware('guest')->post('login', 'store');
    Route::middleware('auth')->post('logout', 'destroy');
});
