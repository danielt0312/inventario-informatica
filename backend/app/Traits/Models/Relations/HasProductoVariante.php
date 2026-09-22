<?php

namespace App\Traits\Models\Relations;

use App\Models\ProductoVariante;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

trait HasProductoVariante
{
    public function productoVariante(): BelongsTo
    {
        return $this->belongsTo(ProductoVariante::class);
    }
}
