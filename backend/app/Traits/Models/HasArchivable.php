<?php

namespace App\Traits\Models;

use Illuminate\Database\Eloquent\Relations\BelongsTo;

use App\Models\{
    Documento,
    Archivo
};

trait HasArchivable
{
    use \Znck\Eloquent\Traits\BelongsToThrough;

    public function initializeHasArchivable(): void
    {
        $this->fillable(array_merge($this->getFillable(), ['documento_id']));
    }

    public function documento(): BelongsTo
    {
        return $this->belongsTo(Documento::class);
    }

    public function archivo(): \Znck\Eloquent\Relations\BelongsToThrough
    {
        return $this->belongsToThrough(Archivo::class, Documento::class);
    }
}
