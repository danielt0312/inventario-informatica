<?php

namespace App\Traits\Models;

use App\Models\Articulo;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

trait HasDocumento
{
    use HasNoAiPrimaryKey;

    public function initializeHasDocumento(): void
    {
        $this->primaryKey = 'archivo_id';
        $this->with[] = 'articulo';
    }

    public function articulo(): BelongsTo
    {
        return $this->belongsTo(Articulo::class, 'articulo_id');
    }
}
