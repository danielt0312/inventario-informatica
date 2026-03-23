<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

use App\Models\ProductoModelo;

class ProductoMarca extends Model
{
    protected $fillable = [
        'nombre'
    ];

    public function modelos() {
        $this->hasMany(ProductoModelo::class);
    }
}
