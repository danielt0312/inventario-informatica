<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

use App\Models\Producto;

class ProductoTipo extends Model
{
    protected $fillable = [
        'nombre'
    ];

    public function productos() {
        return $this->hasMany(Producto::class);
    }
}
