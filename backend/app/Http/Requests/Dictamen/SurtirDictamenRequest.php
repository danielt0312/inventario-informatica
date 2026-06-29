<?php

namespace App\Http\Requests\Dictamen;

class SurtirDictamenRequest extends ActionDictamenRequest
{
    public function authorize(): bool
    {
        return $this->dictamen->esEstadoSurtir();
    }
}
