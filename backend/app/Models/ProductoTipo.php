<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

use App\Models\{Producto, ProuctoCategoria};

class ProductoTipo extends Model
{
    protected $fillable = [
        'producto_categoria_id',
        'nombre'
    ];

    public function categoria() {
        return $this->hasOne(ProductoCategoria::class);
    }

    public function productos() {
        return $this->hasMany(Producto::class);
    }
}
