<?php

namespace App\Http\Requests\Factura;

use Illuminate\Foundation\Http\FormRequest;

class StoreFacturaRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'fecha_emision' => ['required', 'date', 'before_or_equal:today'],
            'archivo' => ['required', 'file', 'max:5120', 'mimes:pdf'],
            ''
        ];
    }
}
