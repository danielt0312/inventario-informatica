<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

use App\Models\{ProductoTipo, ProductoMarca};

class Producto extends Model
{
    protected $table = 'productos';

    protected $fillable = [
        'tipo_id',
        'marca_id',
        'nombre'
    ];

    public function tipo() {
        return $this->hasOne(ProductoTipo::class);
    }

    public function marca() {
        return $this->hasOne(ProductoMarca::class);
    }
}
