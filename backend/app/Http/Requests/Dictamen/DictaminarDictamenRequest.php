<?php

namespace App\Http\Requests\Dictamen;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

use App\Models\Dictamen;

class DictaminarDictamenRequest extends FormRequest
{
    private Dictamen $dictamen;

    protected function prepareForValidation(): void
    {
        $this->dictamen = $this->route('dictamen');
    }

    public function authorize(): bool
    {
        return $this->dictamen->estado->esDictaminar();
    }

    public function rules(): array
    {
        return [
            'productos' => ['required', 'array'],
            'productos.*.id' => [
                'required',
                'integer',
                Rule::exists('dictamen_productos', 'id')->where(function ($query) {
                    $query->where('dictamen_id', $this->dictamen->id);
                }),
            ],
            'productos.*.caracteristicas' => ['required', 'string', 'max:255']
        ];
    }
}
