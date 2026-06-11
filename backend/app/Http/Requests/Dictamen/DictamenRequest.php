<?php

namespace App\Http\Requests\Dictamen;

use Illuminate\Foundation\Http\FormRequest;

class DictamenRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'folio' => ['nullable', 'string'],
            'estados' => ['nullable', 'array'],
            'estados.*' => ['integer', 'exists:dictamen_estados,id']
        ];
    }
}
