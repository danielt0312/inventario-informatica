<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

use App\Models\{ProductoTipo, ProductoMarca};

class Producto extends Model
{
    protected $table = 'productos';

    protected $fillable = [
        'producto_tipo_id',
        'producto_marca_id',
        'nombre'
    ];

    public function tipo() {
        return $this->hasOne(ProductoTipo::class, 'id', 'producto_tipo_id');
    }

    public function marca() {
        return $this->hasOne(ProductoMarca::class, 'id', 'producto_marca_id');
    }
}
