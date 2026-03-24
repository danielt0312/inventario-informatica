<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

use App\Models\Producto;

class ProductoMarca extends Model
{
    protected $table = 'producto_marcas';

    protected $fillable = [
        'nombre'
    ];

    public function productos() {
        $this->belongsTo(Producto::class);
    }
}
