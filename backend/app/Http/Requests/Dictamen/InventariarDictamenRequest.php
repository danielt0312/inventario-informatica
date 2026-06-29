<?php

namespace App\Http\Requests\Dictamen;

class InventariarDictamenRequest extends ActionDictamenRequest
{
    public function authorize(): bool
    {
        return $this->estadoEsInventariar();
    }

    public function rules(): array
    {
        return [

        ];
    }
}
