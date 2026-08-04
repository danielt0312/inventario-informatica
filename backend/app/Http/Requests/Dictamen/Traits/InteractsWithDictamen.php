<?php

namespace App\Http\Requests\Dictamen\Traits;

use App\Models\Dictamen;

trait InteractsWithDictamen
{
    protected Dictamen $dictamen;

    protected function prepareForValidation(): void
    {
        $this->dictamen = $this->route('dictamen');
    }
}
