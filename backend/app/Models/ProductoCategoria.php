<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

use App\Models\ProductoTipo;

class ProductoCategoria extends Model
{
    protected $table = 'producto_categorias';

    protected $fillable = [
        'tipo_id',
        'nombre'
    ];

    public function tipos() {
        return $this->belongsTo(ProductoTipo::class);
    }
}

