<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Factura extends Model
{
    protected string $table = 'facturas';

    protected array $fillable = [
        'fecha_emision',
        'documento_id',
    ];

    public bool $timestamps = false;

    public function documento(): BelongsTo {
        return $this->belongsTo(Documento::class, 'documento_id');
    }
}
