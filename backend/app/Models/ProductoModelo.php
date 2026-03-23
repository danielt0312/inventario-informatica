<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

use App\Models\{Producto, ProductoMarca};

class ProductoModelo extends Model
{
    protected $fillable = [
        'producto_id',
        'producto_marca_id',
        'nombre'
    ];

    public function producto() {
        return $this->hasOne(Producto::Class);
    }

    public function marca() {
        return $this->hasOne(ProductoMarca::Class);
    }
}
