<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;
use App\Services\CuentaContableService;

class CuentaContableFormat implements ValidationRule
{
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string, ?string=): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        if (!is_string($value)) {
            $fail('validation.string', compact('attribute'));
            return;
        }

        if (!CuentaContableService::esValido($value)) {
            $fail("La $attribute debe ser una cuenta contable válida");
        }
    }
}
