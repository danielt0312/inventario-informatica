<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

use App\Traits\Models\{HasArchivable, HasProveedor, HasResourceResponse};

class OrdenCompra extends Model
{
    use HasArchivable, HasProveedor, HasResourceResponse;

    protected $fillable = [
        'fecha_solicitud',
        'numero_orden',
    ];

    public $timestamps = false;

    public function facturas(): BelongsToMany
    {
        return $this->belongsToMany(Factura::class);
    }
}
