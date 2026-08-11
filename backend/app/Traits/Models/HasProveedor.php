<?php

namespace App\Traits\Models;

use Illuminate\Database\Eloquent\Relations\BelongsTo;

use App\Models\Proveedor;

trait HasProveedor
{
    public function initializeHasProveedor(): void
    {
        $this->fillable(array_merge($this->getFillable(), ['proveedor_id']));
    }

    public function proveedor(): BelongsTo
    {
        return $this->belongsTo(Proveedor::class);
    }
}
