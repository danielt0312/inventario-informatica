<?php

namespace App\Traits\Models\Relations;

use Illuminate\Database\Eloquent\Relations\BelongsTo;

use App\Models\Proveedor;

trait HasProveedor
{
    public function proveedor(): BelongsTo
    {
        return $this->belongsTo(Proveedor::class);
    }
}
