<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\{BelongsTo, HasMany};
use App\Traits\Models\HasArchivable;

class OrdenCompra extends Model
{
    use HasArchivable;

    protected $fillable = [
        'fecha_solicitud',
        'numero_orden',
        'proveedor_id'
    ];

    public $timestamps = false;

    public function proveedor(): BelongsTo
    {
        return $this->belongsTo(Proveedor::class);
    }

    public function facturas(): HasMany
    {
        return $this->hasMany(Factura::class);
    }
}
