<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    public function store(LoginRequest $request) {
        $request->authenticate();

        $request->session()->regenerate();

        return response()->json(['data' => Auth::user()]);
    }

    public function destroy(Request $request) {
        Auth::logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return response();
    }
}
