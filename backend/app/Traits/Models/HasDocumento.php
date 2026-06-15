<?php

namespace App\Traits\Models;

use App\Models\Documento;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

trait HasDocumento
{
    public function initializeHasDocumento(): void
    {
        $this->with[] = 'documento';
    }

    public function documento(): BelongsTo
    {
        return $this->belongsTo(Documento::class);
    }
}
