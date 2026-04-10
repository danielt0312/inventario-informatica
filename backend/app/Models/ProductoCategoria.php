<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class ProductoCategoria extends Model
{
    use HasFactory;

    protected $table = 'producto_categorias';

    protected $fillable = [
        'nombre',
    ];

    public $timestamps = false;
}

