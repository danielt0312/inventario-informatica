<?php

namespace App\Traits\Models\Relations;

use App\Models\Dictamen;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

trait HasDictamen
{
    public function dictamen(): BelongsTo
    {
        return $this->belongsTo(Dictamen::class);
    }
}
