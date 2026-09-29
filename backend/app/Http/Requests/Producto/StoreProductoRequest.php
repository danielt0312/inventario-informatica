<?php

namespace App\Http\Requests\Producto;

use Closure;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Validator;
use App\Services\ProductoService;

class StoreProductoRequest extends FormRequest
{
    public function __construct(
        protected ProductoService $productoService
    ) {
        parent::__construct();
    }

    public function rules(): array
    {
        return [
            'tipo_id' => [
                'required',
                'integer',
                'exists:producto_tipos,id',
                function (string $attribute, mixed $value, Closure $fail) {
                    if ($this->productoService->tieneVariante($value)) {
                        logger()->warning('Intento de creación de producto generico con variante', [
                            'payload' => $validator->getData(),
                            'user_id' => auth()->id(),
                            'ip' => $this->ip(),
                        ]);

                        $fail('Este tipo de producto no puede ser creado genéricamente.');
                    }
                }
            ],
            'marca_id' => [
                'required',
                'integer',
                'exists:producto_marcas,id'
            ],
            'modelo' => [
                'required',
                'string',
                'max:128',
                'unique:productos,modelo'
            ],
        ];
    }
}
