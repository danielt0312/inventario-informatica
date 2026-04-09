<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

use App\Models\Producto;

class ProductoMarca extends Model
{
    use HasFactory;

    protected $table = 'producto_marcas';

    protected $fillable = [
        'nombre'
    ];

    public $timestamps = false;

    public function productos() {
        return $this->hasMany(Producto::class, 'producto_id');
    }
}
