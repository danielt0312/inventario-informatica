<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

use App\Models\{Producto, ProductoCategoria};

class ProductoTipo extends Model
{
    protected $table = 'producto_tipos';

    protected $fillable = [
        'producto_categoria_id',
        'nombre'
    ];

    public function categoria() {
        return $this->hasOne(ProductoCategoria::class);
    }

    public function productos() {
        return $this->belongsTo(Producto::class);
    }
}
