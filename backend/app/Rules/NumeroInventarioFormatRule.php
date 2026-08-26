<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;
use App\Services\NumeroInventarioService;

class NumeroInventarioFormatRule implements ValidationRule
{
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        if (!is_string($value)) {
            $fail('validation.string')->translate();
        }

        if (!NumeroInventarioService::matches($value)) {
            $fail('validation.regex')->translate();
        }
    }
}
