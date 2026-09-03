<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

use App\Traits\Models\HasResourceResponse;
use App\Traits\Models\Relations\{
    HasDocumentable,
    HasProveedor
};

class OrdenCompra extends Model
{
    use HasDocumentable, HasProveedor, HasResourceResponse;

    protected $fillable = [
        'proveedor_id',
        'fecha_solicitud',
        'numero_orden',
    ];

    public function facturas(): BelongsToMany
    {
        return $this->belongsToMany(Factura::class);
    }
}
