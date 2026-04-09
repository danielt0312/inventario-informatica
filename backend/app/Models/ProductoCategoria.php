<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

use App\Models\ProductoTipo;

class ProductoCategoria extends Model
{
    use HasFactory;

    protected $table = 'producto_categorias';

    protected $fillable = [
        'nombre',
    ];

    public $timestamps = false;

    public function tipos() {
        return $this->hasMany(ProductoTipo::class, 'tipo_id');
    }
}

