<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\{HasMany, BelongsTo};

use App\Traits\Models\HasArchivable;

class Factura extends Model
{
    use HasArchivable;

    protected $fillable = [
        'orden_compra_id',
        'fecha_emision',
    ];

    public $timestamps = false;

    public function articulos(): HasMany
    {
        return $this->hasMany(Articulo::class);
    }

    public function ordenCompra(): BelongsTo
    {
        return $this->belongsTo(OrdenCompra::class);
    }
}
