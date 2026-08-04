<?php

namespace App\Http\Requests\Dictamen;

use Illuminate\Foundation\Http\FormRequest;
use App\Http\Requests\Dictamen\Traits\InteractsWithDictamen;

class SurtirDictamenRequest extends FormRequest
{
    use InteractsWithDictamen;

    public function authorize(): bool
    {
        return $this->dictamen->esEstadoSurtir();
    }
}
