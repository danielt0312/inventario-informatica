<?php

namespace App\Traits\Models\Relations;

use App\Models\Proveedor;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

trait HasProveedor
{
    public function proveedor(): BelongsTo
    {
        return $this->belongsTo(Proveedor::class);
    }
}
