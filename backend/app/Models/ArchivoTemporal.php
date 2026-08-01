<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ArchivoTemporal extends Model
{
    protected $fillable = [
        'archivo_id',
        'user_id',
        'expires_at',
        'created_at',
    ];

    public $timestamps = false;

    public function archivo(): BelongsTo
    {
        return $this->belongsTo(Archivo::class);
    }
}
