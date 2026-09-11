<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Ram extends Model
{
    protected $fillable = [
        'tipo_id',
        'capacidad_id',
        'velocidad_id',
    ];

    protected $attributes = [
        'velocidad_id' => null,
    ];

    public $timestamps = false;

    public function tipo(): BelongsTo
    {
        return $this->belongsTo(RamTipo::class);
    }

    public function capacidad(): BelongsTo
    {
        return $this->belongsTo(RamCapacidad::class);
    }

    public function velocidad(): BelongsTo
    {
        return $this->belongsTo(RamVelocidad::class);
    }
}
