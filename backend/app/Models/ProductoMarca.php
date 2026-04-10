<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class ProductoMarca extends Model
{
    use HasFactory;

    protected $table = 'producto_marcas';

    protected $fillable = [
        'nombre',
    ];

    public $timestamps = false;
}
