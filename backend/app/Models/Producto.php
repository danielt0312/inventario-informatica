<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

use App\Models\{ProductoTipo, ProductoModelo};

class Producto extends Model
{
    protected $table = 'productos';

    protected $fillable = [
        'producto_tipo_id',
        'nombre'
    ];

    public function tipo() {
        return $this->hasOne(ProductoTipo::class);
    }

    public function modelo() {
        return $this->belongsTo(ProductoModelo::class);
    }
}

