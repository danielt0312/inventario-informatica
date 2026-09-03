<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\{BelongsToMany, HasMany};

use App\Traits\Models\HasResourceResponse;
use App\Traits\Models\Relations\{
    HasDocumentable,
    HasProveedor
};

class Factura extends Model
{
    use HasDocumentable, HasProveedor, HasResourceResponse;

    protected $fillable = [
        'proveedor_id',
        'folio',
        'fecha_emision',
    ];

    public $timestamps = false;

    public function articulos(): HasMany
    {
        return $this->hasMany(Articulo::class);
    }

    public function ordenCompras(): BelongsToMany
    {
        return $this->belongsToMany(OrdenCompra::class);
    }
}
