<?php

namespace App\Http\Requests\Dictamen;

use Illuminate\Foundation\Http\FormRequest;
use App\Models\Dictamen;

class ActionDictamenRequest extends FormRequest
{
    protected Dictamen $dictamen;

    protected function prepareForValidation(): void
    {
        $this->dictamen = $this->route('dictamen');
    }
}
