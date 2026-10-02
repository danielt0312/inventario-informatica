<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Camara extends Model
{
    public function tipo(): BelongsTo
    {
        return $this->belongsTo(CamaraTipo::class);
    }
}
