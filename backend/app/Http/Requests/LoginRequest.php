<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class LoginRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'email'     => 'required|email|ends_with:asetamaulipas.gob.mx',
            'password'  => 'required',
        ];
    }
}
