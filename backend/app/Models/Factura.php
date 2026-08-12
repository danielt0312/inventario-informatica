<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\{BelongsToMany, HasMany};

use App\Traits\Models\{HasArchivable, HasProveedor, HasResourceResponse};

class Factura extends Model
{
    use HasArchivable, HasProveedor, HasResourceResponse;

    protected $fillable = [
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
