<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Camara extends Model
{
    protected $fillable = [
        'tipo_id',
    ];

    public $timestamps = false;

    public function tipo(): BelongsTo
    {
        return $this->belongsTo(CamaraTipo::class);
    }
}
