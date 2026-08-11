<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FacturaOrdenCompra extends Model
{
    protected $fillable = [
        'factura_id',
        'orden_compra_id'
    ];

    public $timestamps = false;
}
