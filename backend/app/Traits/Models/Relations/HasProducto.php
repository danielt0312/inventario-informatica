<?php

namespace App\Traits\Models\Relations;

use App\Models\Producto;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

trait HasProducto
{
    public function producto(): BelongsTo
    {
        return $this->belongsTo(Producto::class);
    }
}
