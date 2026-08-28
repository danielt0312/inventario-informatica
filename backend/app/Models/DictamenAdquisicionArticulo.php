<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class DictamenAdquisicionArticulo extends Model
{
    protected $fillable = [
        'articulo_id',
        'dictamen_adquisicion_id'
    ];

    public function dictamenAdquisicion(): BelongsTo
    {
        return $this->belongsTo(DictamenAdquisicion::class);
    }

    public function articulo(): BelongsTo
    {
        return $this->belongsTo(Articulo::class);
    }
}
