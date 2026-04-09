<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

use App\Models\{Producto, ProductoCategoria};

class ProductoTipo extends Model
{
    use HasFactory;

    protected $table = 'producto_tipos';

    protected $fillable = [
        'categoria_id',
        'nombre'
    ];

    public $timestamps = false;

    public function categoria() {
        return $this->belongsTo(ProductoCategoria::class, 'categoria_id');
    }

    public function productos() {
        return $this->hasMany(Producto::class, 'tipo_id');
    }
}
