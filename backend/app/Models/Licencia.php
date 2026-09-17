<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Licencia extends Model
{
    protected $fillable = [
        'estado_id',
    ];

    public $timestamps = false;

    public function estado(): BelongsTo
    {
        return $this->belongsTo(LicenciaEstado::class);
    }
}
