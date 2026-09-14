<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\{
    BelongsTo,
    MorphTo,
};

class DictamenSurtimiento extends Model
{
    protected $fillable = [
        'dictamen_adquisicion_id',
    ];

    public function dictamenAdquisicion(): BelongsTo
    {
        return $this->belongsTo(DictamenAdquisicion::class);
    }

    public function adquirible(): MorphTo
    {
        return $this->morphTo();
    }
}
