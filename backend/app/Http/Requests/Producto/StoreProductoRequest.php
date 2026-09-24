<?php

namespace App\Http\Requests\Producto;

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
                'exists:producto_tipos,id'
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

    protected function after(): array
    {
        return [
            function (Validator $validator) {
                if ($validator->errors()->isNotEmpty()) return;

                if ($this->productoService->tieneVariante($this->tipo_id)) {
                    logger()->warning('Intento de creación de producto generico con variante', [
                        'payload' => $validator->getData(),
                        'user_id' => auth()->id(),
                        'ip' => $this->ip(),
                    ]);

                    $validator->addFailure('tipo_id', 'Este tipo de producto no puede ser creado genéricamente');
                }
            }
        ];
    }
}
