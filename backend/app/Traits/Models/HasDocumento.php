<?php

namespace App\Traits\Models;

use App\Models\Documento;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

trait HasDocumento
{
    use HasNoAiPrimaryKey;

    public function initializeHasDocumento(): void
    {
        $this->primaryKey = 'documento_id';
        $this->with[] = 'documento';
    }

    public function documento(): BelongsTo
    {
        return $this->belongsTo(Documento::class, 'documento_id', 'archivo_id');
    }
}
